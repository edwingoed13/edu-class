<template>
  <div class="bg-background-dark text-white min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-navy-accent/50 p-8 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl">
      <div class="text-center mb-10">
        <div class="flex justify-center mb-4">
          <span class="material-symbols-outlined text-primary text-5xl">terminal</span>
        </div>
        <h1 class="text-3xl font-bold mb-2">Welcome back</h1>
        <p class="text-slate-400">Join the next generation of digital builders</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-bold text-primary uppercase tracking-widest mb-2">Email Address</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">mail</span>
            <input 
              v-model="email"
              type="email" 
              required
              class="w-full bg-background-dark border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="oscar@example.com"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-primary uppercase tracking-widest mb-2">Password</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">lock</span>
            <input 
              v-model="password"
              type="password" 
              required
              class="w-full bg-background-dark border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-primary text-background-dark font-black py-4 rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          <span v-if="loading" class="material-symbols-outlined animate-spin">progress_activity</span>
          <span v-else>{{ isSignUp ? 'Create Account' : 'Sign In' }}</span>
          <span v-if="!loading" class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </form>

      <div class="mt-8 text-center">
        <button 
          @click="isSignUp = !isSignUp"
          class="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
        >
          {{ isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }}
        </button>
      </div>

      <div v-if="error" class="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)
const isSignUp = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = null
  
  try {
    const { data, error: authError } = isSignUp.value 
      ? await supabase.auth.signUp({ email: email.value, password: password.value })
      : await supabase.auth.signInWithPassword({ email: email.value, password: password.value })

    if (authError) throw authError
    
    if (isSignUp.value && data?.user?.identities?.length === 0) {
      error.value = "User already exists. Please sign in instead."
    } else if (isSignUp.value) {
      alert('Sign up successful! Please check your email for confirmation.')
    } else {
      router.push('/dashboard')
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>
