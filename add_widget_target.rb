require 'xcodeproj'

project_path = 'ios/App/App.xcodeproj'
project = Xcodeproj::Project.open(project_path)

# ==========================================
# 0. GET APP TARGET
# ==========================================
app_target = project.targets.find { |t| t.name == 'App' }
if app_target.nil?
  puts "Error: App target not found"
  exit 1
end

app_group = project.main_group.find_subpath('App/App', false) || project.main_group.find_subpath('App', true)

# ==========================================
# 1. SETUP VigorWidgets Target
# ==========================================

# CLEANUP: Remove stale references that cause "filename used twice" errors
%w[RestTimerAttributes.swift RestTimerLiveActivity.swift VigorWidgetsBundle.swift LiveActivityPlugin.m MyViewController.swift].each do |filename|
  project.files.select { |f| f.path == filename }.each do |ref|
    app_target.source_build_phase.remove_file_reference(ref) rescue nil
    ref.remove_from_project
    puts "Cleaned up old #{filename} reference from App target."
  end
end

if project.targets.any? { |t| t.name == 'VigorWidgets' }
  puts "Target VigorWidgets already exists."
  project.save
  exit 0
end

puts "Creating VigorWidgets target..."
widget_target = project.new_target(:app_extension, 'VigorWidgets', :ios, '16.2')
widget_target.product_name = 'VigorWidgets'

# VigorWidgets group
widget_group = project.main_group.find_subpath('VigorWidgets', true)
widget_group.set_source_tree('<group>')
widget_group.set_path('VigorWidgets')

# Add widget source files to the VigorWidgets target
widget_files = ['RestTimerAttributes.swift', 'RestTimerLiveActivity.swift', 'VigorWidgetsBundle.swift']
widget_file_refs = {}

widget_files.each do |file_name|
  widget_file_refs[file_name] = widget_group.new_reference(file_name)
  widget_target.source_build_phase.add_file_reference(widget_file_refs[file_name])
end

# Add Info.plist reference
widget_group.new_reference('Info.plist')

# CRITICAL: RestTimerAttributes.swift must ALSO be compiled by the main App target
# because LiveActivityPlugin.swift (in App) uses the RestTimerAttributes type.
app_target.source_build_phase.add_file_reference(widget_file_refs['RestTimerAttributes.swift'])
puts "Added RestTimerAttributes.swift to main App target (shared with VigorWidgets)."

# Build Settings for Widget Extension
widget_target.build_configurations.each do |config|
  config.build_settings['INFOPLIST_FILE'] = 'VigorWidgets/Info.plist'
  config.build_settings['PRODUCT_BUNDLE_IDENTIFIER'] = 'com.vigor.app.VigorWidgets'
  config.build_settings['PRODUCT_NAME'] = 'VigorWidgets'
  config.build_settings['SWIFT_VERSION'] = '5.0'
  config.build_settings['TARGETED_DEVICE_FAMILY'] = '1'
  config.build_settings['SKIP_INSTALL'] = 'YES'
  config.build_settings['CODE_SIGN_STYLE'] = 'Manual'
  config.build_settings['CODE_SIGN_IDENTITY'] = ''
  config.build_settings['PROVISIONING_PROFILE_SPECIFIER'] = ''
  config.build_settings['DEVELOPMENT_TEAM'] = ''
  config.build_settings['GENERATE_INFOPLIST_FILE'] = 'NO'
  config.build_settings['CURRENT_PROJECT_VERSION'] = '1'
  config.build_settings['MARKETING_VERSION'] = '1.0'
end

# Link required frameworks to the VigorWidgets target
frameworks_group = project.frameworks_group
%w[WidgetKit SwiftUI ActivityKit].each do |framework|
  ref = frameworks_group.new_reference("System/Library/Frameworks/#{framework}.framework")
  ref.source_tree = 'SDKROOT'
  widget_target.frameworks_build_phase.add_file_reference(ref, true)
end

# Embed the extension inside the App bundle
embed_phase = app_target.new_copy_files_build_phase('Embed App Extensions')
embed_phase.dst_subfolder_spec = '13'
embed_phase.symbol_dst_subfolder_spec = :plug_ins
build_file = embed_phase.add_file_reference(widget_target.product_reference)
build_file.settings = { 'ATTRIBUTES' => ['RemoveHeadersOnCopy'] }

# Link App → VigorWidgets as dependency
app_target.add_dependency(widget_target)

project.save
puts "✅ Successfully added VigorWidgets extension target."

# ==========================================
# 2. INJECT PLUGIN TO CAPACITOR CONFIG
# ==========================================
require 'json'
config_path = 'ios/App/App/capacitor.config.json'
if File.exist?(config_path)
  begin
    config = JSON.parse(File.read(config_path))
    config['packageClassList'] ||= []
    unless config['packageClassList'].include?('LiveActivityPlugin')
      config['packageClassList'] << 'LiveActivityPlugin'
      File.write(config_path, JSON.pretty_generate(config))
      puts "✅ Injected LiveActivityPlugin into capacitor.config.json"
    end
  rescue => e
    puts "⚠️ Failed to inject plugin into config: #{e.message}"
  end
end
