import React, { Component } from 'react';
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
      event: "", session: "", formType: "", formData: [], editForm : false
    }
  }
  componentWillMount() {
    this.props.getEvents();
  }
  componentDidMount() {
    if (this.props.currentFormData.length !== 0) {
      let form = this.props.currentFormData;
      if (form.formType === 'Home Questions') {
        this.setState({
          event: form.event._id,
          formType: form.formType,
          formData: form.formData,
          editForm : true
        });
      }
      else {
        this.setState({
          // event: form.event._id,
          // session: form.session._id,
          formType: form.formType,
          formData: form.formData,
          editForm : true
        });
      }
    }
  }
  handleEventSelectChange(value) {
    let event = value;
    this.setState({
      event: event
    });
    this.props.getSessions(value);
  }

  handleSessionSelectChange(value) {
    let session = value;
    this.setState({
      session: session
    });
  }

  handleFormSelectChange(value) {
    let formType = value;
    this.setState({
      formType: formType
    });
  }

  onDisplayNewQuestion() {
    QuesLayout = this.state.formData.map((que, id) => {
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
      );
    });
    return QuesLayout;
  }

  onAddQuestion() {
    let newQuestion = { question: "", inputType: "", options: [{ value: "" }] };
    let Question = [...this.state.formData];
    Question.push(newQuestion);
    this.setState({
      formData: Question
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
    let questionArray = [...this.state.formData];
    let optionsValue = questionArray[id].options;
    optionsValue[parseInt(event.target.name)].value = event.target.value;
    questionArray[id].options = optionsValue;
    this.setState({
      formData: questionArray
    });
  }

  onAddOption(id) {
    let questionArray = [...this.state.formData];
    let option = { value: "" };
    let optionArray = questionArray[id].options;
    optionArray.push(option);
    questionArray[id].options = optionArray;
    this.setState({
      formData: questionArray
    });
  }

  onDeleteOption(id) {
    let questionArray = [...this.state.formData];
    let optionArray = questionArray[id].options;
    let length = optionArray.length - 1;
    optionArray.splice(length, 1);;
    questionArray[id].options = optionArray;
    this.setState({
      formData: questionArray
    });
  }

  onSelectChange(id, event) {
    let questionArray = [...this.state.formData];
    if (event !== null) {
      questionArray[id].inputType = event.value;
      questionArray[id].options = [{ value: "" }];
    } else {
      questionArray[id].inputType = "";
      questionArray[id].options = [{ value: "" }];
    }
    this.setState({
      formData: questionArray
    });
  }

  onInputQuestion(event) {
    let questionArray = [...this.state.formData];
    questionArray[parseInt(event.target.name)].question = event.target.value;
    this.setState({
      formData: questionArray
    });
  }

  onDeleteQuestion(id) {
    let questionArray = [...this.state.formData];
    questionArray.splice(id, 1);
    this.setState({
      formData: questionArray
    });
  }

  onSubmitForm() {
    let formData = { ...this.state };
    let formObject = _.pick(formData, ['event', 'session', 'formType', 'formData']);
    let id = this.props.currentFormData._id;
    if ((this.state.formType === 'Polling Questions' || this.state.formType === 'Feedback Questions') && (this.state.event && this.state.session)) {
      this.state.editForm ? this.props.editForm(id, formObject) : this.props.createForm(formObject);
    }
    else if (this.state.formType === 'Home Questions' && this.state.event) {
      formObject.session = null;
      this.state.editForm ? this.props.editForm(id, formObject) : this.props.createForm(formObject);
    }
    else {
      alert("please select required fields");
    }
  }

  render() {
    const { event, session, formType } = this.state;
    const eventOptions = this.props.events;
    const sessionOptions = this.props.sessions;
    const formOptions = this.props.formTypes;
    return (
      <CardLayout name="Question Forms">
        <FormGroup row>
          <Col xs="12" md="4">
            <Select
              placeholder="Select Form Type"
              value={formType}
              options={formOptions}
              simpleValue
              onChange={this.handleFormSelectChange.bind(this)}
            />
          </Col>
          <Col md="4" >
            <Select
              placeholder="Select Event"
              value={event}
              options={eventOptions}
              simpleValue
              onChange={this.handleEventSelectChange.bind(this)}
            />
          </Col>
          <Col md="4">
            <Select
              placeholder="Select Session"
              value={session}
              options={sessionOptions}
              simpleValue
              onChange={this.handleSessionSelectChange.bind(this)}
            />
          </Col>
        </FormGroup>
        
        {/* <FormGroup row>
          {
            this.props.formError ? 
          }
        </FormGroup> */}
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
        <FormGroup row>
          <Col xs="12" md="10" >
            <Button type="button" size="md" color="success" onClick={() => this.onSubmitForm()}>Create Form</Button>
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
    formTypes: state.questionForm.formTypes,
    currentFormData: state.questionForm.formData
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getEvents : () => dispatch(actions.getEvents()),
    getSessions : (id) => dispatch(actions.getSessionsOfEvent(id)),
    createForm : (formObject) => dispatch(actions.createForm(formObject)),
    editForm : (id, formObject) => dispatch(actions.editForm(id, formObject)) 
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionForms);
