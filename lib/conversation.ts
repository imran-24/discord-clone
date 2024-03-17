import { db } from "@/lib/db"

export const findOrCreateConversation = async (
    memberOneId: string,
    memberTwoId: string
) => {
    let conversation =
      (await findConversation(memberOneId, memberTwoId)) ||
      (await findConversation(memberTwoId, memberOneId));

    if (!conversation) {
      conversation = await createConversation(memberOneId, memberTwoId);
    }

    return conversation;
};

const findConversation = async (memberOneId: string, memberTwoId: string) => {
    try{
        // there is a catch if I assign the response in a variable 
        // there there will be a type error, that's why we have to 
        // return the response without assigning to a variable

        // const conversation =  await db.conversation.findFirst({

        return await db.conversation.findFirst({
          where: {
            AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTwoId }],
          },
          include: {
            memberOne: {
              include: {
                profile: true,
              },
            },
            memberTwo: {
              include: {
                profile: true,
              },
            },
          },
        });
    }catch{
        return null;
    }
}

const createConversation = async (memberOneId: string, memberTwoId: string) => {
    try{
        return await db.conversation.create({
        data: {
        memberOneId,
        memberTwoId,
        },
        include: {
        memberOne: {
            include: {
            profile: true,
            },
        },
        memberTwo: {
            include: {
            profile: true,
            },
        },
        },
    });
    }catch{
        return null;
    }
};