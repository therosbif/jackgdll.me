<script lang="ts">
  export let title: string;
  export let body: string;
  export let startDate: Date;
  export let endDate: Date | undefined;
  export let logo: string;

  export let open = false;

  const timeDiff = getTimeDiff(startDate, endDate);

  function getTimeDiff(start: Date, end: Date | undefined) {
    const timeDiff = end
      ? end.getTime() - start.getTime()
      : Date.now() - start.getTime();
    const months = Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 30);
    const years = Math.floor(months / 12);
    return years > 0 ? `${years} years` : `${months} months`;
  }

  $: classes = open
    ? "max-w-xl p-4 pr-12"
    : "flex w-24 items-center [&>details>summary]:rotate-90";
</script>

<section
  class="prose-headings:underline transition-all border-2 justify-center prose-p:prose prose-headings:text-4xl prose-h1:h-min {classes}"
>
  <details bind:open>
    <summary class="list-none h-full transition-all">
      {#if open}
        <img src={logo} alt="{title} logo" class="max-h-20" />
      {:else}
        <h1>{title}</h1>
      {/if}
    </summary>
    <sub class="text-slate-500"
      >{startDate?.toLocaleDateString() ?? ""} - {endDate?.toLocaleDateString() ??
        "Present"} ({timeDiff})</sub
    >
    <hr class="my-4" />
    <p>{body}</p>
  </details>
</section>
