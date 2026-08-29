files = ["index.html", "script.js"]

replacements = {
  "bg-[#09090b]" => "bg-slate-950",
  "bg-[#18181b]" => "bg-slate-900",
  "bg-[#27272a]" => "bg-slate-800",
  "border-[#27272a]" => "border-slate-800",
  "border-[#09090b]" => "border-slate-900"
}

files.each do |file|
  content = File.read(file)
  
  replacements.each do |hex, slate|
    content.gsub!(hex, slate)
  end
  
  File.write(file, content)
end
puts "Replaced hardcoded hex colors."
