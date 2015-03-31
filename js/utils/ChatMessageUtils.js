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

module.exports = {

	// Why do we have rawMessage here?
  convertRawMessage: function(rawMessage, currentThreadID) {
		/*
		 * rawMessage ---
		 * id:
		 * threadID: the message itself has threadID (i.e. groupID)
		 * authorName:
		 * timestamp: unix timestamp
		 * text:
		 *
		 * After conversion ---
		 * id:
		 * threadID:
		 * authroName:
		 * date: date object
		 * text:
		 * isRead: this is the new thing! (ThreadStore has a prop called currentThreadID to keep track which is viewing currently)
		 *
		 * isRead: because a single thread contains many messages, so if a thread is read, then all messages are read.
		 */

    return {
      id: rawMessage.id,
      threadID: rawMessage.threadID,
      authorName: rawMessage.authorName,
      date: new Date(rawMessage.timestamp),
      text: rawMessage.text,
      isRead: rawMessage.threadID === currentThreadID
    };
  },

	// Grep the text and currentThreadID and create the actual message, passing around the system. 
  getCreatedMessageData: function(text, currentThreadID) {
    var timestamp = Date.now();
    return {
      id: 'm_' + timestamp,
      threadID: currentThreadID,
      authorName: 'Bill', // hard coded for the example
      date: new Date(timestamp),
      text: text,
      isRead: true
    };
  }

};
