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

var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
var ChatMessageUtils = require('../utils/ChatMessageUtils');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {
	// 1. We are creating a message, so we fire the CREATE_MESSAGE (event) with text, and currentThreadID
	// and pass it to the view.
	// 2. There are viewAction and serverAction. Once we are in hadleViewAction, it wraps the type, text, currentThreadID, etc into pay
	// load, then pass it to dispatcher.
	// 3. Dispatcher either dispatch it or pending it.
	// 4. Because we have 3 stores, then it means we loop through the dispath loop 3 times each time.
  createMessage: function(text, currentThreadID) {
    ChatAppDispatcher.handleViewAction({
			// e.g. when we press the enter key, then message is created.			
      type: ActionTypes.CREATE_MESSAGE,
      text: text,
      currentThreadID: currentThreadID
    });

		// Why do we have this????
		// Because we need to wrap the text and currentThreadID into an object (i.e. turn into proper message object)
    var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);

		// Store the message into localStorage, and fire an event to notify the server. (ServerActionCreator)
    ChatWebAPIUtils.createMessage(message);
  }

};
