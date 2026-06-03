import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add variables to :root
root_vars = """
            /* Typography Scale (Ratio 1.333) */
            --text-xs: 0.75rem;     /* 12px */
            --text-sm: 0.875rem;    /* 14px */
            --text-base: 1rem;      /* 16px */
            --text-lg: 1.125rem;    /* 18px */
            --text-xl: 1.333rem;    /* 21.3px */
            --text-2xl: 1.777rem;   /* 28.4px */
            --text-3xl: 2.369rem;   /* 37.9px */
            --text-4xl: 3.157rem;   /* 50.5px */
            --text-5xl: 4.209rem;   /* 67.3px */
            --leading-tight: 1.1;
            --leading-relaxed: 1.6;
"""
content = re.sub(r'(--transition: all 0\.25s ease;)', r'\1\n' + root_vars, content)

# Also add global heading rule
heading_rule = """
        h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading); line-height: var(--leading-tight); }"""
content = re.sub(r'(html \{ scroll-behavior: smooth; \})', r'\1\n' + heading_rule, content)

# Update body
content = re.sub(r'body \{ font-family: var\(--font-body\); color: var\(--cream\); background-color: var\(--dark\); line-height: 1\.5; \}',
                 r'body { font-family: var(--font-body); color: var(--cream); background-color: var(--dark); line-height: var(--leading-relaxed); font-size: var(--text-base); }',
                 content)

# Update explicit line-heights in CSS
content = re.sub(r'line-height:\s*1\.1\b', 'line-height: var(--leading-tight)', content)
content = re.sub(r'line-height:\s*1\.4\b', 'line-height: var(--leading-relaxed)', content)
content = re.sub(r'line-height:\s*1\.5\b', 'line-height: var(--leading-relaxed)', content)
content = re.sub(r'line-height:\s*1\b([^.])', r'line-height: var(--leading-tight)\1', content)

# Regex to find font-size: \d+px
def size_mapper(match):
    size = int(match.group(1))
    if size <= 13: return 'font-size: var(--text-xs)'
    elif size <= 15: return 'font-size: var(--text-sm)'
    elif size <= 17: return 'font-size: var(--text-base)'
    elif size <= 19: return 'font-size: var(--text-lg)'
    elif size <= 24: return 'font-size: var(--text-xl)'
    elif size <= 30: return 'font-size: var(--text-2xl)'
    elif size <= 40: return 'font-size: var(--text-3xl)'
    elif size <= 50: return 'font-size: var(--text-4xl)'
    else: return 'font-size: var(--text-5xl)'

content = re.sub(r'font-size:\s*(\d+)px', size_mapper, content)

# Do not remove explicit font-family: var(--font-heading) to preserve it on non-heading elements like .logo
# We just leave it as is.

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
