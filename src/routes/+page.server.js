import supabase from '$lib/supabase/config'

export const load = async () => {
  const { data, error } = await supabase.from("todolist").select("*");
  console.log('data: ', data)
  return { todolist: data };
};