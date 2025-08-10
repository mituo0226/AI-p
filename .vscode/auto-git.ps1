# .vscode/auto-git.ps1
$ErrorActionPreference = "SilentlyContinue"

$branch = git rev-parse --abbrev-ref HEAD 2>$null
if ([string]::IsNullOrEmpty($branch)) { $branch = "main" }

git add -A | Out-Null
if (git diff --cached --quiet) { exit 0 }

$msg = "auto: " + (Get-Date -Format "yyyy-MM-dd HH:mm")
git commit -m $msg | Out-Null
try { git pull --rebase origin $branch | Out-Null } catch {}
git push origin HEAD:$branch | Out-Null
