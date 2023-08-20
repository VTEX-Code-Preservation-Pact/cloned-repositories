[watcher:thumbor]
cmd = thumbor
args = --conf=/code/thumbor.conf --fd $(circus.sockets.thumbor)
numprocesses = 36
use_sockets = True
uid = thumbor
gid = thumbor
working_dir = /code
virtualenv = /code/env
copy_env = True
autostart = True

[socket:thumbor]
host = 0.0.0.0
port = 8000
