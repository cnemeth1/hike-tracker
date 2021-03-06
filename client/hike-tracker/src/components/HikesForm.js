import React from 'react';
import { Modal, Form, Button, Icon } from 'semantic-ui-react';

export class HikesForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    this.setState({[name]: event.target.value})
  }

  formSubmit = (event) => {
    event.preventDefault()
    const url = 'https://tower-project.herokuapp.com/hikes'
    const postData = {
      name: this.state.name,
      location: this.state.location,
      elevation: this.state.elevation,
      terrain: this.state.terrain,
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(response => {
        this.props.updatedHike(response)
      })
    .then(this.setState({
      name: '',
      location: '',
      elevation: '',
      terrain: ''
      }))
      .then(this.closeModal)
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const {
      showModal
    } = this.state

    return(
      <div className='submit-container'>
        <Modal closeIcon onClose={this.closeModal} open={showModal} trigger={<Button onClick={() => this.setState({ showModal: true })}><Icon className='plus' />Add Hike</Button>}>
          <Modal.Header>Add Hike</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.formSubmit}>
              <Form.Field>
                <label>Hike Name</label>
                <input placeholder='Hike Name' name="name" type='text' onChange={this.handleChange} required/>
              </Form.Field>
              <Form.Field>
                <label>Location</label>
                <input placeholder='Location' name="location" type='text' onChange={this.handleChange} required/>
              </Form.Field>
              <Form.Field>
                <label>Elevation</label>
                <input placeholder='Elevation' name="elevation" type='number' onChange={this.handleChange} required/>
              </Form.Field>
              <Form.Field>
                <label>Terrain</label>
                <input placeholder='Terrain' name="terrain" type='text' onChange={this.handleChange} required/>
              </Form.Field>
                <Button type='submit' value='Submit'>Submit</Button>
              </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}