# conf.py

import os
import sys

# Add the current directory to the Python path
sys.path.insert(0, os.path.abspath('.'))

# -- General configuration ------------------------------------------------

# Project name
project = 'My Project'

# Project version
version = '1.0'

# Project release
release = '1.0.0'

# Documentation language
language = 'en'

# Documentation theme (or choose your own)
html_theme = 'sphinx_rtd_theme'

# -- Options for HTML output ----------------------------------------------

# Directory to save generated HTML files
html_static_path = ['_static']

# -- Options for LaTeX output ---------------------------------------------

# Directory to save generated LaTeX files
latex_elements = {
    'papersize': 'letterpaper',
    'pointsize': '10pt',
    'preamble': '',
}

# -- Options for manual page output ---------------------------------------

# Directory to save generated manual pages
man_pages = [
    (master_doc, 'myproject', 'My Project Documentation', [author], 1)
]

# -- Options for Texinfo output -------------------------------------------

# Directory to save generated Texinfo files
texinfo_documents = [
    (master_doc, 'myproject', 'My Project Documentation',
     author, 'My Project', 'One line description of project.',
     'Miscellaneous'),
]
