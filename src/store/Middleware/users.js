import history from "../../historyProvider";
import messages from "../../message";
import { toast } from "react-toastify";

export default {
  /// Needs Customer ID and desired state
  fetchSalaries(userID) {
    return fetch("/api/users/salary/get?id=" + userID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }

      // body: JSON.stringify(data)
    }).then(resp => {
      return resp.json();
    });
  },
  createSalary(data) {
    return dispatch => {
      fetch("/api/users/salary/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(salary => {
          if (salary._id) {
            dispatch({
              type: "SALARY_SAVED"
            });
            toast.success(messages.users.salaryCreated);
          } else {
            toast.error(messages.users.error.cannotCreateSalary);
          }
        });
    };
  },
  uploadUser(data) {
    debugger
    return dispatch => {
      fetch("/api/users/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(users => {
          let filterUser = users.filter((user)=>{
            return  user != null || undefined
          })
          if (users.length > 0) {
            dispatch({
              type:  "USERS_CREATED",
              payload: filterUser,
              model: "users"
            });
            toast.success(messages.users[data._id ? "updated" : "created"]);
          } else {
            toast.error(messages.users.error.cannotCreate);
          }
        });
    };
  },
  toggleUserState(data) {
    return dispatch => {
      fetch("/api/users/toggleState", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(user => {
          if (user._id) {
            dispatch({
              type: "USER_UPDATED",
              payload: user
            });
            toast.success(messages.users.created);
          } else {
            toast.error(messages.users.error.cannotCreate);
          }
        });
    };
  },
  toggleadminState(data) {
    return dispatch => {
      fetch("/api/users/toggleStateadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(user => {
          if (user._id) {
            dispatch({
              type: "USER_UPDATED",
              payload: user
            });
            toast.success(messages.users.created);
          } else {
            toast.error(messages.users.error.cannotCreate);
          }
        });
    };
  },
  createUser(data) {
    return dispatch => {
      fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(user => {
          if (user._id) {
            dispatch({
              type: data._id ? "USER_UPDATED" : "USER_CREATED",
              payload: user,
              model: "users"
            });
            toast.success(messages.users[data._id ? "updated" : "created"]);
          } else {
            toast.error(messages.users.error.cannotCreate);
          }
        });
    };
  },
  deleteUser(userID) {
    return dispatch => {
      fetch("/api/users/del" + userID, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }

        // body: JSON.stringify(data)
      })
        .then(resp => {
          debugger;
          return resp.json();
        })
        .then(user => {
          if (user._id) {
            dispatch({
              type: "USERS_DELETED",
              payload: user
            });

            toast.error(messages.users.deleted);
          } else {
            toast.error(messages.customers.error.cannotCreate);
          }
        });
    };
  }
};
