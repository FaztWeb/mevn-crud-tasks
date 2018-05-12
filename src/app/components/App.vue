<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="/">MEVN Tasks</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="addTask">
                <div class="form-group">
                  <input type="text" v-model="task.title" class="form-control" placeholder="Insert A Task">
                </div>
                <div class="form-group">
                  <textarea v-model="task.description" cols="30" rows="10" placeholder="Insert A Description" class="form-control"></textarea>
                </div>
                <button class="btn btn-primary btn-block">Send</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task of tasks">
                <td>{{task.title}}</td>
                <td>{{task.description}}</td>
                <td>
                  <button @click="deleteTask(task._id)" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

class Task {
  contructor() {
    this.title = '';
    this.description = '';
  }
}

export default {
  data() {
    return {
      task: new Task(),
      tasks: []
    }
  },
  created() {
    this.getTasks();
  },
  methods: {
    addTask() {

      fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(this.task),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getTasks();
          this.task = new Task();
        });
    },
    getTasks() {
      fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
          this.tasks = data;
        });
    },
    deleteTask(taskId) {
      fetch('/api/tasks/' + taskId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.getTasks();
        });
    }
  }
}
</script>
