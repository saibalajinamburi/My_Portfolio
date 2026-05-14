import re

# Read the bundled file which was built when HTML was correct
with open('index_bundled.html', 'r', encoding='utf-8') as f:
    bundled = f.read()

# Extract body content
body_start = bundled.find('<body>')
body_end = bundled.rfind('</body>') + 7
body = bundled[body_start:body_end]

# Remove inlined <style>...</style> blocks (the bundled CSS)
body = re.sub(r'<style>[\s\S]*?</style>', '', body)

# Remove inlined <script>...</script> blocks (the bundled JS)
body = re.sub(r'<script>[\s\S]*?</script>', '', body)

# Build the complete index.html with external references
html = '''<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Namburi Saibalaji | AI Engineer</title>
    <meta name="description"
        content="Portfolio of Namburi Saibalaji, an AI Systems Engineer specializing in Machine Learning, MLOps, and Agentic AI.">
    <!-- PWA -->
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#f59e0b">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Saibalaji">
    <link rel="stylesheet" href="print.css" media="print">
    <link rel="apple-touch-icon" href="assets/icon-192.png">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="about.css">
    <link rel="stylesheet" href="skills.css">
    <link rel="stylesheet" href="projects.css">
    <link rel="stylesheet" href="contact.css">
    <link rel="stylesheet" href="loading.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

''' + body + '''

    <script src="script.js"></script>
    <script src="about.js"></script>
    <script src="skills.js"></script>
    <script src="projects-data.js"></script>
    <script src="projects.js"></script>
    <script src="contact.js"></script>
    <script src="loading.js"></script>
</body>

</html>'''

# The body already contains <body>...</body> tags so we need to adjust
# Remove duplicate </body></html> if body extraction included them
# Build final: head + body content (stripped of opening/closing body tags from the extract)
body_inner_start = body.find('<body>') + 6
body_inner_end = body.rfind('</body>')
body_inner = body[body_inner_start:body_inner_end]

html_final = '''<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Namburi Saibalaji | AI Engineer</title>
    <meta name="description"
        content="Portfolio of Namburi Saibalaji, an AI Systems Engineer specializing in Machine Learning, MLOps, and Agentic AI.">
    <!-- PWA -->
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#f59e0b">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Saibalaji">
    <link rel="stylesheet" href="print.css" media="print">
    <link rel="apple-touch-icon" href="assets/icon-192.png">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="about.css">
    <link rel="stylesheet" href="skills.css">
    <link rel="stylesheet" href="projects.css">
    <link rel="stylesheet" href="contact.css">
    <link rel="stylesheet" href="loading.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>''' + body_inner + '''
    <script src="script.js"></script>
    <script src="about.js"></script>
    <script src="skills.js"></script>
    <script src="projects-data.js"></script>
    <script src="projects.js"></script>
    <script src="contact.js"></script>
    <script src="loading.js"></script>
</body>

</html>'''

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_final)

# Verify
with open('index.html', 'r', encoding='utf-8') as f:
    result = f.read()

print(f"index.html written: {len(result)} bytes")
print(f"section-header count: {result.count('section-header')}")
print(f"hero-wrapper count: {result.count('hero-wrapper')}")
print(f"scroll-reveal count: {result.count('scroll-reveal')}")
print("Done!")
