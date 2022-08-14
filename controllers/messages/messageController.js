const {
  getUserMessagesService,
  getGroupMessagesService,
  getGroupsService,
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
      throw Error("Unable to fetch group messages")
    }

    res.status(200).json({ messages })
  } catch (error) {
    res.status(400).json({ success: false, response: error.message })
  }
}

const getGroupsController = async (req, res) => {
  try {
    const groups = await getGroupsService()

    if (!groups.success) {
      throw Error("Unable to fetch groups")
    }

    res.status(200).json({ groups })
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
  getGroupsController,
  tipUserController,
}
