<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List </title>
    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h2>Todo List App</h2>
                <button class="btn btn-primary allTodos">Show All Tasks</button>
            </div>
            <div class="card-body">
                <div id="alertContainer"></div>
                <form id="taskForm" class="row g-3 mb-3">
                    <div class="col-md-11">
                        <input type="text" class="form-control" id="todo" name="todo" placeholder="Enter task">
                    </div>
                    <div class="col-md-1">
                        <button type="submit" class="btn btn-primary btn-block">Add</button>
                    </div>
                </form>
                <div class="taskList">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="taskTableBody">
                        </tbody>
                    </table>
                    <div id="loadingSpinner" class="text-center" style="display:none;">
                        <div class="spinner-border text-primary" role="status">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">
    </script>
    <script src="{{ asset('assets/js/script.js') }}"></script>
</body>

</html>