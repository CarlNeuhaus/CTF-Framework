// Generated by CoffeeScript 1.10.0
var ManagementTabbedArea, TabPane, TabbedArea;

TabbedArea = ReactBootstrap.TabbedArea;

TabPane = ReactBootstrap.TabPane;

ManagementTabbedArea = React.createClass({displayName: "ManagementTabbedArea",
  getInitialState: function() {
    var tab;
    tab = window.location.hash.substring(1);
    if (tab === "") {
      tab = "problems";
    }
    return {
      bundles: [],
      problems: [],
      submissions: [],
      exceptions: [],
      tabKey: tab
    };
  },
  onProblemChange: function() {
    apiCall("GET", "/api/admin/problems").done((function(api) {
      return this.setState(React.addons.update(this.state, {
        problems: {
          $set: api.data.problems
        },
        bundles: {
          $set: api.data.bundles
        }
      }));
    }).bind(this));
    return apiCall("GET", "/api/admin/problems/submissions").done((function(api) {
      return this.setState(React.addons.update(this.state, {
        submissions: {
          $set: api.data
        }
      }));
    }).bind(this));
  },
  onExceptionModification: function() {
    return apiCall("GET", "/api/admin/exceptions", {
      limit: 50
    }).done((function(api) {
      return this.setState(React.addons.update(this.state, {
        exceptions: {
          $set: api.data
        }
      }));
    }).bind(this));
  },
  componentDidMount: function() {
    $("#main-content>.container").addClass("container-fluid");
    return $("#main-content>.container").removeClass("container");
  },
  componentWillMount: function() {
    this.onProblemChange();
    return this.onExceptionModification();
  },
  onTabSelect: function(tab) {
    this.setState(React.addons.update(this.state, {
      tabKey: {
        $set: tab
      }
    }));
    window.location.hash = "#" + tab;
    if (tab === "problems") {
      this.onProblemChange();
    }
    if (tab === "exceptions") {
      return this.onExceptionModification();
    }
  },
  render: function() {
    return React.createElement(TabbedArea, {
      "activeKey": this.state.tabKey,
      "onSelect": this.onTabSelect
    }, React.createElement(TabPane, {
      "eventKey": 'problems',
      "tab": 'Manage Problems'
    }, React.createElement(ProblemTab, {
      "problems": this.state.problems,
      "onProblemChange": this.onProblemChange,
      "bundles": this.state.bundles,
      "submissions": this.state.submissions
    })), React.createElement(TabPane, {
      "eventKey": 'exceptions',
      "tab": 'Exceptions'
    }, React.createElement(ExceptionTab, {
      "onExceptionModification": this.onExceptionModification,
      "exceptions": this.state.exceptions
    })), React.createElement(TabPane, {
      "eventKey": 'shell-servers',
      "tab": 'Shell Server'
    }, React.createElement(ShellServerTab, null)), React.createElement(TabPane, {
      "eventKey": 'configuration',
      "tab": 'Configuration'
    }, React.createElement(SettingsTab, null)));
  }
});

$(function() {
  return React.render(React.createElement(ManagementTabbedArea, null), document.getElementById("management-tabs"));
});