var React = require('react');
var Component = require('./Component');
var ReactDOM = require('react-dom');

//ReactDOM.render(<Component/>, document.getElementById('content'));

function finishedLoading() {

  var listOfStudents = JSON.parse(request.responseText);

  console.log("Array Parsed");

  ReactDOM.render(<StudentList inputArray = {listOfStudents} />, document.getElementById('content'));

}

var options = {
  name:'Cal Soc',
  description:'Test Description'
}

var request = new XMLHttpRequest();
//request.open("GET", "http://10.245.137.216:8000/students/?format=json&id=2", true); //true to make it do asynchronously
request.open("GET", "./students.txt", true);
request.addEventListener("load", finishedLoading);
request.send();



var Student = React.createClass({

  render: function() {
    return (
    <div>
      <h1> Name = {this.props.firstname} {this.props.lastname} <br/> </h1>
    </div>
    )
  }
});



var StudentList = React.createClass({

  render: function() {
    var array = this.props.inputArray.map(function(studentProps){

      return <Student {...studentProps} />

    })
    return (
    <div>
      {array}
    </div>
    )

  }
});
