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

var MessageComposer = require('./MessageComposer.react');
var MessageListItem = require('./MessageListItem.react');
var MessageStore = require('../stores/MessageStore');
var React = require('react');
var ThreadStore = require('../stores/ThreadStore');

function getStateFromStores() {
  return {
		// Get current messages.			
    messages: MessageStore.getAllForCurrentThread(),

		// Thread contains id, name of thread and lastMessage. Why lastMessage???
		// So it can be the latest thread				
    thread: ThreadStore.getCurrent()
  };
}

// Use message.map, see below
function getMessageListItem(message) {
  return (
    <MessageListItem
      key={message.id}
      message={message}
    />
  );
}

var MessageSection = React.createClass({

  getInitialState: function() {
		// The state is message + currentThread?? 			
    return getStateFromStores();
  },

	// Initial after mount.
  componentDidMount: function() {
    this._scrollToBottom();
    MessageStore.addChangeListener(this._onChange);
    ThreadStore.addChangeListener(this._onChange);
  },

	// Unmount after it is destroied.
  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
    ThreadStore.removeChangeListener(this._onChange);
  },

  render: function() {
		// messages.map is an array, then passing each element to getMessageListItem			
    var messageListItems = this.state.messages.map(getMessageListItem);

    return (
			// Outside of html, normal comment style.				
      <div className="message-section">
        <h3 className="message-thread-heading">{this.state.thread.name}</h3>
				{ /* Inside html, we still have the jsx comment style: https://facebook.github.io/react/docs/jsx-in-depth.html */ }
				{ /* So we pass the ref here */ }
        <ul className="message-list" ref="messageList">
          {messageListItems}
        </ul>
				{/* We know anytime, which thread we are in */}
        <MessageComposer threadID={this.state.thread.id}/>
      </div>
    );
  },

  componentDidUpdate: function() {
		// Acting like a listener.				
    this._scrollToBottom();
  },

  _scrollToBottom: function() {
		// the refs: https://facebook.github.io/react/docs/more-about-refs.html			
    var ul = this.refs.messageList.getDOMNode();
		// scrollHeight is height + padding of element
		// scrollTop is the scroll bar to the top.
		// so scroll to bottom
    ul.scrollTop = ul.scrollHeight;
  },

  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = MessageSection;
