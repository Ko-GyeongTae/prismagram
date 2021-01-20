import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFeed: async(_, __, {request, isAuthenticated}) => {
            console.log("인증필요");
            console.log(request.user);
            console.log(isAuthenticated(request));
            isAuthenticated(request);
            const { user } = request;
            const following = await prisma
                .user({ id: user.id })
                .following();
            return prisma.posts({
                where:{
                    user:{
                        id_in: [...following.map(user => user.id), user.id]
                    }
                },
                orderBy: "createdAt_DESC"
            });
        }
    }
};