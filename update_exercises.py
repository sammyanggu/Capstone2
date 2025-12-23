import os
import re
from pathlib import Path

exercise_dir = r"c:\Users\Sam\Desktop\Capstone2\src\pages\learning\exercises"
files_to_update = []

# Find all JSX files in exercises
for root, dirs, files in os.walk(exercise_dir):
    for file in files:
        if file.endswith('.jsx') and any(x in file for x in ['Beginner', 'Intermediate', 'Advanced', 'Exercise']):
            files_to_update.append(os.path.join(root, file))

# Replacements
replacements = [
    ('bg-gray-100 rounded-lg shadow-lg', 'bg-white rounded-lg shadow-lg'),
    ('bg-slate-800/50 rounded p-4 mb-4 border border-slate-700/50', 'bg-white rounded p-4 mb-4 border border-gray-300'),
    ('text-emerald-400 hover:text-emerald-300', 'text-emerald-600 hover:text-emerald-700'),
    ('bg-slate-800/50 rounded-lg border border-slate-700/50', 'bg-white rounded-lg border border-gray-300'),
    ('text-slate-300', 'text-gray-700'),
    ('bg-red-900/30 border border-red-700/50 text-red-200', 'bg-red-100 border border-red-400 text-red-800'),
]

print(f"Found {len(files_to_update)} files to update")

for file_path in files_to_update:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        for old, new in replacements:
            content = content.replace(old, new)
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Updated: {os.path.basename(file_path)}")
        else:
            print(f"- No changes: {os.path.basename(file_path)}")
    except Exception as e:
        print(f"✗ Error with {os.path.basename(file_path)}: {str(e)}")

print("\nDone!")
