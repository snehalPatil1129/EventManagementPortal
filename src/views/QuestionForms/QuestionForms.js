import React, { Component } from 'react';
import InputElement from '../../components/Input/';
import CardLayout from '../../components/CardLayout/';
import QuestionLayout from '../../components/QuestionLayout/';
import AnswerLayout from '../../components/AnswerLayout/';
import { FormGroup, Col, Button } from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
let QuesLayout;
class QuestionForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventValue: "",
      sessionValue: "",
      formValue: "",
      Questions: []
    }
  }
  componentWillMount() {
    this.props.getEvents();
  }
  handleEventSelectChange(value) {
    let eventValue = value;
    this.setState({
      eventValue: eventValue
    });
    this.props.getSessions(value);
  }
  handleSessionSelectChange(value) {
    let sessionValue = value;
    this.setState({
      sessionValue: sessionValue
    });
  }
  handleFormSelectChange(value) {
    let formValue = value;
    this.setState({
      formValue: formValue
    });
  }
  onDisplayNewQuestion() {
    QuesLayout = this.state.Questions.map((que, id) => {
      return (
        <div>
          <QuestionLayout
            name={id}
            onchanged={(event) => this.onInputQuestion(event)}
            onChangeSelect={(event) => this.onSelectChange(id, event)}
            onDeleteQuestion={(event) => this.onDeleteQuestion(id)}
            selectValue={que.inputType}
            questionValue={que.question}
          />
          {this.displayAnswerField(que, id)}
        </div>
      )
    });
    return QuesLayout;
  }
  onAddQuestion() {
    let newQuestion = { question: "", inputType: "", options: [{ value: "" }] };
    let Question = [...this.state.Questions];
    Question.push(newQuestion);
    this.setState({
      Questions: Question
    });
  }
  displayAnswerField(que, id) {
    return (
      <AnswerLayout
        inputType={que.inputType}
        name={id}
        options={que.options}
        onAddOption={(event) => this.onAddOption(id)}
        onDeleteOption={(event) => this.onDeleteOption(id)}
        onChangeOptionValue={(event) => this.onChangeOptionValue(event, id)}
      />
    );
  }
  onChangeOptionValue(event, id) {
    let questionArray = [...this.state.Questions];
    let optionsValue = questionArray[id].options;
    optionsValue[parseInt(event.target.name)].value = event.target.value;
    questionArray[id].options = optionsValue;
    this.setState({
      Questions: questionArray
    });
  }
  onAddOption(id) {
    let questionArray = [...this.state.Questions];
    let option = { value: "" };
    let optionArray = questionArray[id].options;
    optionArray.push(option);
    questionArray[id].options = optionArray;
    this.setState({
      Questions: questionArray
    });
  }
  onDeleteOption(id) {
    let questionArray = [...this.state.Questions];
    let optionArray = questionArray[id].options;
    let length = optionArray.length - 1;
    optionArray.splice(length, 1);;
    questionArray[id].options = optionArray;
    this.setState({
      Questions: questionArray
    });
  }

  onSelectChange(id, event) {
    let questionArray = [...this.state.Questions];
    if (event !== null) {
      questionArray[id].inputType = event.value;
      questionArray[id].options = [{ value: "" }];
    } else {
      questionArray[id].inputType = "";
      questionArray[id].options = [{ value: "" }];
    }
    this.setState({
      Questions: questionArray
    });
  }
  onInputQuestion(event) {
    let questionArray = [...this.state.Questions];
    questionArray[parseInt(event.target.name)].question = event.target.value;
    this.setState({
      Questions: questionArray
    });
  }
  onDeleteQuestion(id) {
    let questionArray = [...this.state.Questions];
    questionArray.splice(id, 1);
    this.setState({
      Questions: questionArray
    });
  }
  render() {
    const { eventValue, sessionValue, formValue } = this.state;
    const eventOptions = this.props.events;
    const sessionOptions = this.props.sessions;
    const formOptions = this.props.formTypes;
    return (
      <CardLayout name="Question Forms">
        <FormGroup row>
          <Col xs="12" md="4">
            <Select
              placeholder="Select Form Type"
              value={formValue}
              options={formOptions}
              simpleValue
              onChange={this.handleFormSelectChange.bind(this)}
            />
          </Col>
          <Col md="4" >
            <Select
              placeholder="Select Event"
              value={eventValue}
              options={eventOptions}
              simpleValue
              onChange={this.handleEventSelectChange.bind(this)}
            />
          </Col>
          <Col md="4">
            <Select
              placeholder="Select Session"
              value={sessionValue}
              options={sessionOptions}
              simpleValue
              onChange={this.handleSessionSelectChange.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="10" >
            <Button type="button" size="md" color="primary" onClick={() => this.onAddQuestion()}>Add Question </Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" >
            {this.onDisplayNewQuestion()}
          </Col>
        </FormGroup>
      </CardLayout>
    )
  }
}
const mapStateToProps = state => {
  return {
    events: state.event.eventList,
    sessions: state.questionForm.sessions,
    formTypes: state.questionForm.formTypes
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getEvents: () => dispatch(actions.getEvents()),
    getSessions: (id) => dispatch(actions.getSessionsOfEvent(id))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionForms);
