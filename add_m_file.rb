require 'xcodeproj'
project_path = 'ios/App/App.xcodeproj'
project = Xcodeproj::Project.open(project_path)
app_target = project.targets.find { |t| t.name == 'App' }

file_path = 'App/LiveActivityPlugin.m'

# Add file to project if not already there
group = project.main_group.find_subpath('App', true)
file_ref = group.files.find { |f| f.path == 'LiveActivityPlugin.m' }
if file_ref.nil?
    file_ref = group.new_file('LiveActivityPlugin.m')
end

# Add to compile sources if not already there
unless app_target.source_build_phase.files.any? { |f| f.file_ref == file_ref }
    app_target.source_build_phase.add_file_reference(file_ref)
    puts "Added LiveActivityPlugin.m to App target compile sources"
else
    puts "LiveActivityPlugin.m already in compile sources"
end

project.save
puts "Project saved."
