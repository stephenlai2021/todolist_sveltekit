<script>
	import supabase from '$lib/supabase/config';
	import { todos, textInput } from '$lib/stores/todoListStore';
	import Todo from '$lib/components/Todo.svelte';
	import AddIcon from '$lib/components/icons/AddIcon.svelte';

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
	<h2 class="title">ToDo List</h2>
	<p>Enter your ToDo here</p>
	<div class="inputBox">
		<input
			type="text"
			class="text-input"
			bind:value={$textInput}
		/>
			<!-- placeholder="Enter your todo here" -->
		<button class="btnAdd" on:click={addToDo}>
			<AddIcon />
		</button>
	</div>
</div>

{#each $todos as todo, i}
	<Todo {todo} {i} />
{/each}

<style>
	p {
		/* border: 1px solid; */
		padding-left: 5px;
	}
	.text-input {
		width: 100%;
		border: 1px solid white;
		padding-left: 5px;
	}
	
	.inputBox {
		width: 100%;
		display: flex;
		padding-left: 5px;
	}

	.title {
		text-align: center;
		margin-bottom: 50px;
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
