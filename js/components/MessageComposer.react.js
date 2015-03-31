/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var ChatMessageActionCreators = require('../actions/ChatMessageActionCreators');
var React = require('react');

var ENTER_KEY_CODE = 13;

// This is the textbox for typing.
var MessageComposer = React.createClass({

  propTypes: {
		// This is the grouping id for message.				
    threadID: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
		// So the textarea has a text as state.
		// It monitors the changes.
    return {text: ''};
  },

  render: function() {
    return (
      <textarea
        className="message-composer"
        name="message"
        value={this.state.text}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
      />
    );
  },

	// As usual, many listeners on a single component.
  _onChange: function(event, value) {
		// We need to monitor every letter is typed, because we are not
		// submitting the entire composed box, but rather it is this.state.text.
		// This forces us to onChange the event.target.value.			
    this.setState({text: event.target.value});
  },

	// Type something in textbox, then submit
	// As usual, many listeners on a single component.
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
			// Prevent following link or preventing submit a form.				
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
				// ChatMessageActionCreators normally just fire events, but here we also have
				// createMessage which is coming from util, so it combines firing event and some utils.			
        ChatMessageActionCreators.createMessage(text, this.props.threadID);
      }

			// It monitors the changes. 
      this.setState({text: ''});
    }
  }

});

module.exports = MessageComposer;
