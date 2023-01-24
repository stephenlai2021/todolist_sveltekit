<script>
	import { todos } from '$lib/stores/todoListStore';
	import supabase from '$lib/supabase/config';
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';
	import EditIcon from '$lib/components/icons/EditIcon.svelte';
	import SaveIcon from '$lib/components/icons/SaveIcon.svelte';

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

	// const checkItem = async (todo) => {
	// 	if (todo.checked) await supabase.from('todolist').update({ checked: true }).eq('id', todo.id);
	// 	if (!todo.checked) await supabase.from('todolist').update({ checked: false }).eq('id', todo.id);
	// };

	const setCheckedTrue = async (id) => {
		await supabase.from('todolist').update({ checked: true }).eq('id', todo.id);
	};

	const setCheckedFalse = async (id) => {
		await supabase.from('todolist').update({ checked: false }).eq('id', todo.id);
	};

	$: if (todo.checked) {
		console.log(`id: ${todo.id}, checked: true`);
		setCheckedTrue(todo.id);
	}
	$: if (!todo.checked) {
		console.log(`id: ${todo.id}, checked: false`);
		setCheckedFalse(todo.id);
	}
</script>

<div class="todolist">
	{#if todo.editing}
		<input type="text" class="edit-inputBox" bind:value={todo.content} />
	{:else}
		<input type="checkbox" class="checkbox" bind:checked={todo.checked} />
		<h4 class="todoText" style:text-decoration={todo.checked ? "line-through": ""}>{todo.content}</h4>
	{/if}
	<div class="btnToggle">
		{#if todo.editing}
			<button on:click={() => saveTodo(todo, i)}>
				<SaveIcon />
			</button>
		{:else}
			<button on:click={() => editTodo(todo, i)}>
				<EditIcon />
			</button>
		{/if}
		<button on:click={() => deleteTodo(todo)}>
			<DeleteIcon />
		</button>
	</div>
</div>

<style>
	.checkbox {
		margin-right: 10px;
	}

	.edit-inputBox {
		width: 100%;
		height: 30px;
		color: white;
		border: 1px solid white;
		border-radius: 4px;
	}

	.btnToggle {
		display: flex;
	}

	.todoText {
		flex-grow: 1;
	}

	.todolist {
		display: flex;
		align-items: center;
		width: 500px;
		margin: 0 auto;
		/* border: 1px solid red; */
		height: 62px;
	}

	@media (max-width: 520px) {
		.todolist {
			width: 90%;
		}
	}
</style>
