# Cloner
git clone https://github.com/SteveD-dev/Modern-Taskboard.git
cd taskboard

# Installer
npm install

# Configurer .env
cp .env.example .env
VITE_SUPABASE_URL=https://TON_PROJET.supabase.co
VITE_SUPABASE_ANON_KEY=ANON_KEY_ICI


# Lancer en dev
npm run dev

# Voir la démo en ligne (avec netlify)
https://steady-flan-b9585b.netlify.app/login