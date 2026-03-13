<template>
  <div class="dark min-h-screen bg-background-dark text-slate-100 p-8 md:p-16">
    <div class="max-w-4xl mx-auto bg-navy-accent/20 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
      <header class="mb-12 border-b border-slate-800 pb-8">
        <div class="flex items-center gap-2 mb-6 text-primary">
          <span class="material-symbols-outlined">description</span>
          <span class="text-xs font-bold uppercase tracking-[0.2em]">Project Documentation</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">EdTech Platform Design PRD</h1>
        <p class="text-slate-400">Version 1.2 • Last updated March 2024</p>
      </header>

      <div class="prose prose-invert max-w-none space-y-12">
        <section>
          <h2 class="text-2xl font-bold text-white mb-4">1. Objective</h2>
          <p class="text-slate-300 leading-relaxed">
            The goal of the DevQuest platform is to provide a world-class, immersive learning experience for modern technology skills. The platform must feel premium, fast, and community-driven, targeting individuals looking to transition into high-growth tech roles.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-white mb-4">2. Key Personas</h2>
          <div class="grid md:grid-cols-2 gap-6 mt-6">
            <div class="p-6 bg-background-dark rounded-2xl border border-slate-800">
              <h3 class="font-bold text-primary mb-2">The Transitioner</h3>
              <p class="text-sm text-slate-400">Non-tech professionals (Marketing, Sales) looking to learn coding or UX design from scratch.</p>
            </div>
            <div class="p-6 bg-background-dark rounded-2xl border border-slate-800">
              <h3 class="font-bold text-primary mb-2">The Upskiller</h3>
              <p class="text-sm text-slate-400">Junior-to-mid engineers wanting to master specific advanced topics like Kubernetes or GenAI.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-white mb-4">3. Design Principles</h2>
          <ul class="space-y-4">
            <li class="flex gap-4">
              <div class="size-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                <span class="material-symbols-outlined text-primary text-sm">visibility</span>
              </div>
              <div>
                <strong class="text-white block">Visual Clarity</strong>
                <span class="text-sm text-slate-400">Using a dark mode first approach to reduce eye strain during long learning sessions.</span>
              </div>
            </li>
            <li class="flex gap-4">
              <div class="size-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                <span class="material-symbols-outlined text-primary text-sm">bolt</span>
              </div>
              <div>
                <strong class="text-white block">Interactive Feedback</strong>
                <span class="text-sm text-slate-400">Real-time progress tracking, point systems, and micro-interactions for gamification.</span>
              </div>
            </li>
          </ul>
        </section>

        <section class="pt-12 border-t border-slate-800 text-center">
          <router-link to="/" class="text-primary font-bold hover:underline py-2 px-4">Back to Home</router-link>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
