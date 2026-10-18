$projDir = "C:\Users\17143\.gemini\antigravity-ide\scratch\planet-x-social"
$mcpDir = Join-Path $projDir "mcp-server"
$publicDir = Join-Path $projDir "public"

# 1. MCP Bundle Zip
$mcpZip = Join-Path $projDir "xposure-3.0-mcp-bundle.zip"
if (Test-Path $mcpZip) { Remove-Item -Force $mcpZip }
Compress-Archive -Path "$mcpDir\*" -DestinationPath $mcpZip -Force
Copy-Item -Force $mcpZip (Join-Path $publicDir "xposure-3.0-mcp-bundle.zip")
Write-Host "Created MCP Zip: $mcpZip"

# 2. Source Bundle Zip (includes src, public, docs, mcp-server, index.html, package.json, vite.config.js)
$tempSourceDir = Join-Path $projDir "temp_source_export"
if (Test-Path $tempSourceDir) { Remove-Item -Recurse -Force $tempSourceDir }
New-Item -ItemType Directory -Path $tempSourceDir -Force | Out-Null

Copy-Item -Recurse (Join-Path $projDir "src") (Join-Path $tempSourceDir "src")
Copy-Item -Recurse (Join-Path $projDir "public") (Join-Path $tempSourceDir "public")
Copy-Item -Recurse (Join-Path $projDir "docs") (Join-Path $tempSourceDir "docs")
Copy-Item -Recurse (Join-Path $projDir "mcp-server") (Join-Path $tempSourceDir "mcp-server")
Copy-Item (Join-Path $projDir "index.html") (Join-Path $tempSourceDir "index.html")
Copy-Item (Join-Path $projDir "package.json") (Join-Path $tempSourceDir "package.json")
Copy-Item (Join-Path $projDir "vite.config.js") (Join-Path $tempSourceDir "vite.config.js")

$sourceZip = Join-Path $projDir "xposure-3.0-full-source.zip"
if (Test-Path $sourceZip) { Remove-Item -Force $sourceZip }
Compress-Archive -Path "$tempSourceDir\*" -DestinationPath $sourceZip -Force
Copy-Item -Force $sourceZip (Join-Path $publicDir "xposure-3.0-full-source.zip")
Remove-Item -Recurse -Force $tempSourceDir
Write-Host "Created Full Source Zip: $sourceZip"
