<script>
	import { todos } from '$lib/stores/todoListStore';
	import supabase from '$lib/supabase/config';
	export let todo, i;

	const saveTodo = async (todo, i) => {
		$todos[i].editing = false;

		await supabase
		.from('todolist')
		.update({ editing: false, content: todo.content })
		.eq('id', todo.id);
	};
	
	const editTodo = async () => {
		$todos[i].editing = true;
	};

	const deleteTodo = async (item) => {
		$todos = $todos.filter((todo) => todo.id !== item.id);
		await supabase.from('todolist').delete().eq('id', item.id);
	};

	const setCheckedTrue = async (id) => {
		await supabase
		.from('todolist')
		.update({ checked: true })
		.eq('id', todo.id);
	}

	const setCheckedFalse = async (id) => {
		await supabase
		.from('todolist')
		.update({ checked: false })
		.eq('id', todo.id);
	}

	$: if (todo.checked) {
		console.log(`id: ${todo.id}, checked: true`)
		setCheckedTrue(todo.id)
	}
	$: if (!todo.checked) {
		console.log(`id: ${todo.id}, checked: false`)
		setCheckedFalse(todo.id)		
	}
</script>

<div class="todolist">
	{#if todo.editing}
		<input type="text" bind:value={todo.content} />
	{:else}
		<input type="checkbox" bind:checked={todo.checked} />
		<h4 class="todoText">{todo.content}</h4>
	{/if}
	<div class="btnToggle">
		{#if todo.editing}
			<button on:click={() => saveTodo(todo, i)}>Save</button>
		{:else}
			<button on:click={() => editTodo(todo, i)}>Edit</button>
		{/if}
		<button on:click={() => deleteTodo(todo)}>Delete</button>
	</div>
</div>

<style>
	.btnToggle {
		display: flex;
	}

	.todoText {
		flex-grow: 1;
	}

	.todolist {
		display: flex;
		align-items: baseline;
		width: 700px;
		margin: 0 auto;
	}
</style>
