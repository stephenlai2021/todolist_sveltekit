<script>
	import supabase from '$lib/supabase/config';
	import { todos, textInput } from '$lib/stores/todoListStore';
	import { t, locales, locale } from '$lib/i18n/translations';
	import Todo from '$lib/components/Todo.svelte';
	import AddIcon from '$lib/components/icons/AddIcon.svelte';
	import LangIcon from '$lib/components/icons/LangIcon.svelte';
	import MoonIcon from '$lib/components/icons/MoonIcon.svelte';
	import SunIcon from '$lib/components/icons/SunIcon.svelte';

	export let data;
	const { todolist } = data;

	$todos = todolist;

	const addToDo = async () => {
		const todo = {
			content: $textInput,
			editing: false,
			checked: false,
			id: crypto.randomUUID(),
			created_at: new Date().toLocaleDateString()
		};
		await supabase.from('todolist').insert([{ content: $textInput }]);

		$todos = [...$todos, todo];

		$textInput = '';
	};
</script>

<svelte:head>
	<title>Todo List</title>
</svelte:head>

<div class="todoInput">
	<div class="header">
		<h2 class="title">{$t('common.title')}</h2>
		<div class="utils">
			<!-- <LangIcon /> -->
			{#if $locale === 'en'}
				<span class="menu-item" on:keydown on:click={() => ($locale = 'zh-TW')}>CHN/中文</span>
			{/if}
			{#if $locale === 'zh-TW'}
				<span class="menu-item" on:keydown on:click={() => ($locale = 'en')}>英文/ENG</span>
			{/if}
			<SunIcon />
		</div>
	</div>
	<p class="description">{$t('common.description')}</p>
	<div class="inputBox">
		<input type="text" class="text-input" bind:value={$textInput} />
		<button class="btnAdd" on:click={addToDo}>
			<AddIcon />
		</button>
	</div>
</div>

{#each $todos as todo, i}
	<Todo {todo} {i} />
{/each}

<style>
	.menu-item {
		/* border: 1px solid; */
		cursor: pointer;
	}

	.utils {
		margin-left: auto;
		display: flex;
	}

	.header {
		/* border: 1px solid; */
		display: flex;
		height: 78px;
	}

	p {
		padding-left: 5px;
	}

	.text-input {
		width: 100%;
		/* border: 1px solid white; */
		padding-left: 5px;
	}

	.inputBox {
		width: 100%;
		display: flex;
		padding-left: 5px;
	}

	.title {
		/* text-align: center; */
		margin-bottom: 50px;
		width: calc(100% - 110px);
		/* border: 1px solid;; */
	}

	.description {
		height: 21px;
	}

	.todoInput {
		margin: 0 auto;
		width: 500px;
		padding: 2rem 0;
	}

	@media (max-width: 520px) {
		.todoInput {
			width: 90%;
		}
	}
</style>
