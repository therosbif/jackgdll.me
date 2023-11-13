<script lang="ts">
  export let title: string;
  export let startDate: Date;
  export let endDate: Date | undefined;
  export let logo: string;
  export let showTitle = false;

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
    ? "min-w-fit w-5/12 p-4"
    : "flex w-24 items-center [&>details>summary]:rotate-90";
</script>

<section
  class=" prose-h2:text-xl prose-h1:font-extrabold prose-h1:font-serif prose-headings:underline transition-all border-r-2 border-b-2 justify-center prose-h1:text-4xl prose-h1:h-min {classes}"
>
  <details bind:open>
    {#if open && showTitle}
      <h1 class="whitespace-nowrap">{title}</h1>
    {/if}
    <summary class="list-none h-full transition-all cursor-pointer">
      {#if open}
        <img
          src={logo}
          alt="{title} logo"
          class="max-h-52 m-4 shadow-lg"
          class:float-left={showTitle}
        />
      {:else}
        <h1 class="whitespace-nowrap">{title}</h1>
      {/if}
    </summary>
    <sub class="text-slate-500">
      <time datetime={startDate.toISOString()}>
        {startDate.toLocaleDateString("en-gb", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </time>
      -
      <time datetime={(endDate ?? new Date()).toISOString()}>
        {endDate?.toLocaleDateString("en-gb", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }) ?? "Present"}
      </time>
      ({timeDiff})
    </sub>
    <hr class="my-4" />
    <article class="prose-p:mt-4 prose max-w-full prose-p:font-mono">
      <slot />
    </article>
  </details>
</section>
