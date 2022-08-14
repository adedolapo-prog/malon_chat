const {
  getUserMessagesService,
  getGroupMessagesService,
  tipUserService,
} = require("../../services/messages/messageService")

const getUserMessagesController = async (req, res) => {
  try {
    const messages = await getUserMessagesService(
      req.params.userId,
      req.query.user
    )

    if (!messages.success) {
      throw Error("Unable to fetch chat with user")
    }

    res.status(200).json({ messages })
  } catch (error) {
    res.status(400).json({ success: false, response: error.message })
  }
}

const getGroupMessagesController = async (req, res) => {
  try {
    const messages = await getGroupMessagesService(req.params.groupId)

    if (!messages.success) {
      throw Error("Unable to fetch group chat")
    }

    res.status(200).json({ messages })
  } catch (error) {
    res.status(400).json({ success: false, response: error.message })
  }
}

const tipUserController = async (req, res) => {
  try {
    const messages = await tipUserService({
      param: req.params.userId,
      body: req.body,
    })

    if (!messages.success) {
      throw Error("Unable to tip user")
    }

    res.status(200).json({ messages })
  } catch (error) {
    res.status(400).json({ success: false, response: error.message })
  }
}

module.exports = {
  getUserMessagesController,
  getGroupMessagesController,
  tipUserController,
}
