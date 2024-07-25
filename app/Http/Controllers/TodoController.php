<?php
namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function getIncompleteTodos()
    {
        $todos = Todo::where('is_completed', false)->get();
        return response()->json(['todos' => $todos]);
    }

    public function getAllTodos()
    {
        $todos = Todo::all();
        return response()->json(['todos' => $todos]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'todo' => 'required|unique:todos,todo'
        ]);

        $todo = Todo::create($validatedData);

        return response()->json(['success' => true, 'todo' => $todo]);
    }

    public function update(Request $request, Todo $todo)
    {
        $todo->update(['is_completed' => $request->is_completed ? 1 : 0]);
        return response()->json(['success' => true]);
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->json(['success' => true]);
    }
}