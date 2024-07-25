$(document).ready(function () {
    let showAll = false;
    loadTodos();
    $('#taskForm').on('submit', function (e) {
        e.preventDefault();
        addTodo();
    });
    $('.allTodos').on('click', function () {
        showAll = !showAll;
        loadTodos(showAll);
        $(this).text(showAll ? 'Hide Completed Tasks' : 'Show All Tasks');
    });
    function showLoading() {
        $('#loadingSpinner').show();
    }
    function hideLoading() {
        $('#loadingSpinner').hide();
    }
    function showAlert(message, type = 'success') {
        $('#alertContainer').show();
        $('#alertContainer').html(`
            <div class="alert alert-${type} fade show" role="alert">
                ${message}
            </div>
        `);
        setInterval(() => {
            $('#alertContainer').hide();
        }, 1500);
    }
    function loadTodos(showAll = false) {
        showLoading();
        $.ajax({
            url: showAll ? '/todos/all' : '/todos',
            method: 'GET',
            success: function (response) {
                $('#taskTableBody').empty();
                if (Array.isArray(response.todos)) {
                    response.todos.forEach(function (todo) {
                        $('#taskTableBody').append(renderTodo(todo));
                    });
                } else {
                    console.error('Unexpected response format:', response);
                    showAlert('Error: Unexpected response format', 'danger');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error loading todos:', textStatus, errorThrown);
                showAlert('An error occurred while loading todos. Please try again.', 'danger');
            },
            complete: function () {
                hideLoading();
            }
        });
    }
    function addTodo() {
        let todo = $('#todo').val();
        if (todo.trim() === '') {
            showAlert('Task cannot be empty', 'danger');
            return;
        }
        showLoading();
        $.ajax({
            type: 'POST',
            url: '/todos',
            data: {
                todo: todo,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                if (response.success) {
                    $('#taskTableBody').append(renderTodo(response.todo));
                    $('#todo').val('');
                    showAlert('Task added successfully!');
                } else {
                    showAlert(response.message, 'danger');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.responseJSON && jqXHR.responseJSON.errors && jqXHR.responseJSON.errors.todo) {
                    showAlert(jqXHR.responseJSON.errors.todo[0], 'danger');
                } else {
                    showAlert('An error occurred while adding the task. Please try again.', 'danger');
                }
                console.error('Error adding todo:', textStatus, errorThrown);
            },
            complete: function () {
                hideLoading();
            }
        });
    }
    function renderTodo(todo) {
        return `
            <tr data-id="${todo.id}">
                <td>${todo.id}</td>
                <td>${todo.todo}</td>
                <td>${todo.is_completed ? 'Done' : 'Pending'}</td>
                <td>
                    <input type="checkbox" class="markCompleted" ${todo.is_completed ? 'checked' : ''} data-id="${todo.id}">
                    <button class="btn btn-danger btn-sm deleteTask" data-id="${todo.id}">✖</button>
                </td>
            </tr>
        `;
    }
    $(document).on('change', '.markCompleted', function () {
        let todoId = $(this).data('id');
        let isCompleted = $(this).is(':checked') ? 1 : 0;
        showLoading();
        $.ajax({
            url: `/todos/${todoId}`,
            type: 'PATCH',
            data: {
                is_completed: isCompleted,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                if (response.success) {
                    loadTodos(showAll);
                    showAlert('Task updated successfully!');
                } else {
                    showAlert('Error: ' + response.message, 'danger');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error updating todo:', textStatus, errorThrown);
                showAlert('An error occurred while updating the task. Please try again.', 'danger');
            },
            complete: function () {
                hideLoading();
            }
        });
    });
    $(document).on('click', '.deleteTask', function () {
        let todoId = $(this).data('id');
        if (confirm('Are you sure to delete this task?')) {
            showLoading();
            $.ajax({
                url: `/todos/${todoId}`,
                type: 'DELETE',
                data: {
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    if (response.success) {
                        $(`tr[data-id="${todoId}"]`).remove();
                        showAlert('Task deleted successfully!');
                    } else {
                        showAlert('Error: ' + response.message, 'danger');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('Error deleting todo:', textStatus, errorThrown);
                    showAlert('An error occurred while deleting the task. Please try again.', 'danger');
                },
                complete: function () {
                    hideLoading();
                }
            });
        }
    });
});
