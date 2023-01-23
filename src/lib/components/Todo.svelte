<script>
	import { todos } from '$lib/stores/todoListStore';
	import supabase from '$lib/supabase/config';
	export let todo, i;

	const setEditing = async (i, isEditing) => {
		$todos[i].editing = isEditing;

		await supabase
			.from('todolist')
			.update({ editing: isEditing, content: todo.content })
			.eq('id', i+1);
	};

	const deleteTodo = async (id) => {
		await supabase.from('todolist').delete().eq('id', id);
		$todos = $todos.filter((todo) => todo.id !== id);
	};
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
			<button on:click={() => setEditing(i, false)}>Save</button>
		{:else}
			<button on:click={() => setEditing(i, true)}>Edit</button>
		{/if}
		<button on:click={() => deleteTodo(todo.id)}>Delete</button>
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
