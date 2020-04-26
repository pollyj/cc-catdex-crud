module.exports = (knex, ChannelMessage) => {
  return (params) => {
    console.log("params in create:", params);
    const fromId = params.fromId;
    const channelId = params.channelId;
    const message = params.message;
    const sentAt = params.sent_at;

    return knex("channel_messages")
      .insert({
        from: fromId,
        to: channelId,
        message,
      })
      .then(() => {
        return knex("channel_messages")
          // inner join -> 
          .where({ to: channelId })
          .select( /* select necessary items with AS */);
      })
      .then((messages) => {
        const result = [];
        messages.map((msg) => {
          const temp = new ChannelMessage(msg);
          result.push(temp); // dont need to push with map...!!!!!
        });
        return result;
      })
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(
            new Error("A channel with that name already exists.")
          );

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
