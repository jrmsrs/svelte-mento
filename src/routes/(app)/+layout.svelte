<script lang="ts">
  import '$root/app.css'
  import './styles.css'
  import auth, { getUser } from 'sveltekit-auth0'
  import { onMount, onDestroy } from 'svelte'
  import { loading$, storedDark } from '$root/stores'

  import Header from '$components/Header.svelte'
  import Skeleton from '$components/Skeleton.svelte'
  import BgContainer from '$components/BgContainer.svelte'
  import BgMain from '$components/BgMain.svelte'
  import ThemeButton from '$components/ThemeButton.svelte'

  let subscription: any
  let loadingSubscription: any
  let loading: boolean

  const registerLocal = (options?: { logout: boolean }) => {
    const user$ = getUser()
    subscription = user$.subscribe(value => {
      localStorage.setItem('auth0:user', options?.logout ? '{}' : JSON.stringify(value || {}))
    })
    loadingSubscription = loading$.subscribe(value => {
      loading = value
    })
  }
  onMount(() => {
    auth.initializeAuth0()
    registerLocal()
  })
  onDestroy(() => {
    subscription?.unsubscribe()
    loadingSubscription?.unsubscribe()
  })
  const setDarkMode = () => {
    dark = !dark
    localStorage.setItem('dark', dark.toString())
  }
  let dark = storedDark !== 'false' || false
</script>

<svelte:head>
  <meta name="theme-color" content={dark ? '#111827' : '#F3F4F6'} />
  <!-- dark 111827 | light F3F4F6 -->
</svelte:head>

<div class="app {dark ? 'dark ' : ''}h-screen scroll-smooth">
  <Skeleton type="floating" {loading} />
  <ThemeButton {dark} {setDarkMode} />
  <BgContainer>
    <Header {registerLocal} />
    <BgMain>
      <slot />
    </BgMain>
  </BgContainer>
</div>
