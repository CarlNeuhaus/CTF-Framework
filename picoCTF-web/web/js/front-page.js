// Generated by CoffeeScript 1.10.0
var Alert, AuthPanel, Button, ButtonGroup, ButtonInput, Col, Glyphicon, Input, LoginForm, Panel, Row, TeamManagementForm, update;

Input = ReactBootstrap.Input;

Row = ReactBootstrap.Row;

Col = ReactBootstrap.Col;

Button = ReactBootstrap.Button;

Panel = ReactBootstrap.Panel;

Glyphicon = ReactBootstrap.Glyphicon;

ButtonInput = ReactBootstrap.ButtonInput;

ButtonGroup = ReactBootstrap.ButtonGroup;

Alert = ReactBootstrap.Alert;

update = React.addons.update;

LoginForm = React.createClass({displayName: "LoginForm",
  render: function() {
    var formButton, lockGlyph, q, registrationForm, showEmailFilter, showGroupMessage, userGlyph;
    userGlyph = React.createElement(Glyphicon, {
      "glyph": "user"
    });
    lockGlyph = React.createElement(Glyphicon, {
      "glyph": "lock"
    });
    formButton = this.props.status === "Login" ? q = "'" : void 0;
    if (this.props.status === "Reset") {
      return React.createElement(Panel, null, React.createElement("form", {
        "onSubmit": this.props.onPasswordReset
      }, React.createElement("p", null, React.createElement("i", null, "A password reset link will be sent the user", q, "s email.")), React.createElement(Input, {
        "type": "text",
        "valueLink": this.props.username,
        "addonBefore": userGlyph,
        "placeholder": "Username",
        "required": "visible"
      }), React.createElement("div", {
        "style": {
          height: "70px"
        }
      }), React.createElement(Row, null, React.createElement(Col, {
        "md": 6.
      }, React.createElement(ButtonInput, {
        "type": "submit"
      }, "Reset Password")), React.createElement(Col, {
        "md": 6.
      }, React.createElement("span", {
        "className": "pull-right pad"
      }, "Go back to ", React.createElement("a", {
        "onClick": this.props.setPage.bind(null, "Login")
      }, "Login"), ".")))));
    } else {
      showGroupMessage = (function() {
        return React.createElement(Alert, {
          "bsStyle": "info"
        }, "You are registering as a member of ", React.createElement("strong", null, this.props.groupName), ".");
      }).bind(this);
      showEmailFilter = (function() {
        return React.createElement(Alert, {
          "bsStyle": "warning"
        }, "You can register provided you have an email for one of these domains: ", React.createElement("strong", null, this.props.emailFilter.join(", ")), ".");
      }).bind(this);
      registrationForm = this.props.status === "Register" ? React.createElement("span", null, React.createElement(Row, null, React.createElement("div", null, (this.props.groupName.length > 0 ? showGroupMessage() : React.createElement("span", null)), (this.props.emailFilter.length > 0 && !this.props.rid ? showEmailFilter() : React.createElement("span", null))), React.createElement(Col, {
        "md": 6.
      }, React.createElement(Input, {
        "type": "text",
        "id": "first-name",
        "valueLink": this.props.firstname,
        "label": "First Name"
      })), React.createElement(Col, {
        "md": 6.
      }, React.createElement(Input, {
        "type": "text",
        "id": "last-name",
        "valueLink": this.props.lastname,
        "label": "Last Name"
      }))), React.createElement(Row, null, React.createElement(Col, {
        "md": 12.
      }, React.createElement(Input, {
        "type": "email",
        "id": "email",
        "valueLink": this.props.email,
        "label": "E-mail"
      }))), React.createElement(Row, null, React.createElement(Col, {
        "md": 6.
      }, React.createElement(Input, {
        "type": "text",
        "id": "affiliation",
        "valueLink": this.props.affiliation,
        "label": "Affiliation"
      })), React.createElement(Col, {
        "md": 6.
      }, React.createElement(Input, {
        "type": "select",
        "label": "Status",
        "placeholder": "Competitor",
        "valueLink": this.props.eligibility
      }, React.createElement("option", {
        "value": "eligible"
      }, "Competitor"), React.createElement("option", {
        "value": "ineligible"
      }, "Instructor"), React.createElement("option", {
        "value": "ineligible"
      }, "Other")))), React.createElement(ButtonInput, {
        "type": "submit"
      }, "Register")) : React.createElement("span", null);
      return React.createElement(Panel, null, React.createElement("form", {
        "key": this.props.status,
        "onSubmit": (this.props.status === "Login" ? this.props.onLogin : this.props.onRegistration)
      }, React.createElement(Input, {
        "type": "text",
        "id": "username",
        "valueLink": this.props.username,
        "addonBefore": userGlyph,
        "label": "Username"
      }), React.createElement(Input, {
        "type": "password",
        "id": "password",
        "valueLink": this.props.password,
        "addonBefore": lockGlyph,
        "label": "Password"
      }), React.createElement(Row, null, React.createElement(Col, {
        "md": 6.
      }, (this.props.status === "Register" ? React.createElement("span", {
        "className": "pad"
      }, "Go back to ", React.createElement("a", {
        "onClick": this.props.setPage.bind(null, "Login")
      }, "Login"), ".") : React.createElement("span", null, React.createElement(Button, {
        "type": "submit"
      }, "Login"), React.createElement(Button, {
        "id": "set-register",
        "onClick": this.props.setPage.bind(null, "Register")
      }, "Register")))), React.createElement(Col, {
        "md": 6.
      }, React.createElement("a", {
        "className": "pad",
        "onClick": this.props.setPage.bind(null, "Reset")
      }, "Need to reset your password?"))), registrationForm));
    }
  }
});

TeamManagementForm = React.createClass({displayName: "TeamManagementForm",
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {};
  },
  onTeamRegistration: function(e) {
    e.preventDefault();
    return apiCall("POST", "/api/team/create", {
      team_name: this.state.team_name,
      team_password: this.state.team_password
    }).done(function(resp) {
      switch (resp.status) {
        case 0:
          return apiNotify(resp);
        case 1:
          return document.location.href = "/profile";
      }
    });
  },
  onTeamJoin: function(e) {
    e.preventDefault();
    return apiCall("POST", "/api/team/join", {
      team_name: this.state.team_name,
      team_password: this.state.team_password
    }).done(function(resp) {
      switch (resp.status) {
        case 0:
          return apiNotify(resp);
        case 1:
          return document.location.href = "/profile";
      }
    });
  },
  render: function() {
    var lockGlyph, towerGlyph;
    towerGlyph = React.createElement(Glyphicon, {
      "glyph": "tower"
    });
    lockGlyph = React.createElement(Glyphicon, {
      "glyph": "lock"
    });
    return React.createElement(Panel, null, React.createElement("form", {
      "onSubmit": this.onTeamJoin
    }, React.createElement(Input, {
      "type": "text",
      "valueLink": this.linkState("team_name"),
      "addonBefore": towerGlyph,
      "label": "Team Name",
      "required": true
    }), React.createElement(Input, {
      "type": "password",
      "valueLink": this.linkState("team_password"),
      "addonBefore": lockGlyph,
      "label": "Team Password",
      "required": true
    }), React.createElement(Col, {
      "md": 6.
    }, React.createElement("span", null, " ", React.createElement(Button, {
      "type": "submit"
    }, "Join Team"), React.createElement(Button, {
      "onClick": this.onTeamRegistration
    }, "Register Team"))), React.createElement(Col, {
      "md": 6.
    }, React.createElement("a", {
      "href": "#",
      "onClick": (function() {
        return document.location.href = "/profile";
      })
    }, "Play as an individual."))));
  }
});

AuthPanel = React.createClass({displayName: "AuthPanel",
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    var params;
    params = $.deparam($.param.fragment());
    return {
      page: "Login",
      settings: {},
      gid: params.g,
      rid: params.r,
      status: params.status,
      groupName: "",
      eligibility: "eligible"
    };
  },
  componentWillMount: function() {
    if (this.state.status === "verified") {
      apiNotify({
        status: 1,
        message: "Your account has been successfully verified. Please login."
      });
    }
    if (this.state.gid) {
      apiCall("GET", "/api/group/settings", {
        gid: this.state.gid
      }).done((function(resp) {
        switch (resp.status) {
          case 0:
            return apiNotify(resp);
          case 1:
            return this.setState(update(this.state, {
              groupName: {
                $set: resp.data.name
              },
              affiliation: {
                $set: resp.data.name
              },
              settings: {
                $merge: resp.data.settings
              },
              page: {
                $set: "Register"
              }
            }));
        }
      }).bind(this));
    } else {
      apiCall("GET", "/api/team/settings").done((function(resp) {
        return this.setState(update(this.state, {
          settings: {
            $merge: resp.data
          }
        }));
      }).bind(this));
    }
    return apiCall("GET", "/api/user/status").done((function(resp) {
      return this.setState(update(this.state, {
        settings: {
          $merge: resp.data
        }
      }));
    }).bind(this));
  },
  onRegistration: function(e) {
    e.preventDefault();
    return apiCall("POST", "/api/user/create_simple", this.state).done((function(resp) {
      var verificationAlert;
      switch (resp.status) {
        case 0:
          return apiNotify(resp);
        case 1:
          verificationAlert = {
            status: 1,
            message: "You have been sent a verification email. You will need to complete this step before logging in."
          };
          if (this.state.settings.max_team_size > 1) {
            if (this.state.settings.email_verification && !this.state.rid) {
              apiNotify(verificationAlert);
              this.setPage("Login");
              return document.location.hash = "#team-builder";
            } else {
              apiNotify(resp);
              return this.setPage("Team Management");
            }
          } else {
            if (this.state.settings.email_verification) {
              if (!this.state.rid || this.state.rid.length === 0) {
                apiNotify(verificationAlert);
              } else {
                apiNotify(resp, "/profile");
              }
              this.setPage("Login");
              if (this.state.settings.max_team_size > 1) {
                return document.location.hash = "#team-builder";
              }
            } else {
              return apiNotify(resp, "/profile");
            }
          }
      }
    }).bind(this));
  },
  onPasswordReset: function(e) {
    e.preventDefault();
    return apiCall("POST", "/api/user/reset_password", {
      username: this.state.username
    }).done((function(resp) {
      apiNotify(resp);
      if (resp.status === 1) {
        return this.setPage("Login");
      }
    }).bind(this));
  },
  onLogin: function(e) {
    e.preventDefault();
    return apiCall("POST", "/api/user/login", {
      username: this.state.username,
      password: this.state.password
    }).done((function(resp) {
      switch (resp.status) {
        case 0:
          return apiNotify(resp);
        case 1:
          if (document.location.hash === "#team-builder") {
            return this.setPage("Team Management");
          } else {
            if (resp.data.teacher) {
              return document.location.href = "/classroom";
            } else {
              return document.location.href = "/profile";
            }
          }
      }
    }).bind(this));
  },
  setPage: function(page) {
    return this.setState(update(this.state, {
      page: {
        $set: page
      }
    }));
  },
  componentDidMount: function() {
    return $("input").prop('required', true);
  },
  componentDidUpdate: function() {
    return $("input").prop('required', true);
  },
  render: function() {
    var links;
    links = {
      username: this.linkState("username"),
      password: this.linkState("password"),
      lastname: this.linkState("lastname"),
      firstname: this.linkState("firstname"),
      email: this.linkState("email"),
      affiliation: this.linkState("affiliation"),
      eligibility: this.linkState("eligibility")
    };
    if (this.state.page === "Team Management") {
      return React.createElement("div", null, React.createElement(Row, null, React.createElement(Col, {
        "md": 6.,
        "mdOffset": 3.
      }, React.createElement(TeamManagementForm, null))));
    } else {
      return React.createElement("div", null, React.createElement(Row, null, React.createElement(Col, {
        "md": 6.,
        "mdOffset": 3.
      }, React.createElement(LoginForm, Object.assign({
        "setPage": this.setPage,
        "status": this.state.page,
        "onRegistration": this.onRegistration,
        "onLogin": this.onLogin,
        "onPasswordReset": this.onPasswordReset,
        "emailFilter": this.state.settings.email_filter,
        "groupName": this.state.groupName,
        "rid": this.state.rid,
        "gid": this.state.gid
      }, links)))));
    }
  }
});

$(function() {
  return React.render(React.createElement(AuthPanel, null), document.getElementById("auth-box"));
});