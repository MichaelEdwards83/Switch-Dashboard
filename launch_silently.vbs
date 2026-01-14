Set WshShell = CreateObject("WScript.Shell")
strPath = Replace(WScript.ScriptFullName, "launch_silently.vbs", "startup.bat")
WshShell.Run chr(34) & strPath & chr(34), 0
Set WshShell = Nothing
