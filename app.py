import subprocess
import sys
import os

# Start the Express server
os.chdir(os.path.join(os.path.dirname(__file__), 'server'))
subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', '../requirements.txt'])
subprocess.call(['node', 'index.js'])
