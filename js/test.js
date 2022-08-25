comment.replies.forEach(replay => {
    let commentDiv = document.createElement('div')
    commentDiv.className = 'comment relative'

    let mainComment = document.createElement('div')
    mainComment.className = 'rounded-lg px-6 py-4 bg-white flex gap-8 items-start mb-4'

    let voteComment = document.createElement('div')
    voteComment.className = 'vote bg-[#c3c4ef47] flex flex-col gap-2 p-2 px-4 rounded-lg items-center'

    let voteInc = document.createElement('span')
    voteInc.className = 'text-[#c3c4ef] text-lg cursor-pointer'
    voteInc.append('+')
    
    let voteCount = document.createElement('span')
    voteCount.className = 'count text-[#5457b6] font-bold text-lg'
    voteCount.append(replay.score)

    let voteDec = document.createElement('span')
    voteDec.className = 'text-[#c3c4ef] text-lg cursor-pointer'
    voteDec.append('+')

    voteComment.appendChild(voteInc)
    voteComment.appendChild(voteCount)
    voteComment.appendChild(voteDec)

    let detailComment = document.createElement('div')
    replay.className = 'flex flex-col gap-4 flex-1'

    let User = document.createElement('div')
    User.className = 'flex justify-between'

    detailUser = document.createElement('div')
    detailUser.className = 'flex items-center gap-2'

    let userAvatar = document.createElement('img')
    userAvatar.src = replay.user.image.png
    userAvatar.alt = replay.user.username

    let userName = document.createElement('h2')
    userName.className = 'text-[#324152] font-bold'
    userName.append(replay.user.username)

    let createdAt = document.createElement('span')
    createdAt.className = 'text-sm text-[#67727e]'
    createdAt.append(moment(replay.createdAt).fromNow())

    let countainerBtn = document.createElement('div')
    countainerBtn.className = 'flex gap-4 flex-row-reverse'

    detailUser.appendChild(userAvatar)
    detailUser.appendChild(userName)
    detailUser.appendChild(createdAt)

    let replayBtn = document.createElement('button')
    replayBtn.className = 'flex items-center gap-2 text-[#5457b6] font-bold'
    let replayIcon = `<svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>`
    replayBtn.insertAdjacentHTML('beforeend', replayIcon)
    replayBtn.appendChild(document.createTextNode('Replay'))

    let deleteBtn = document.createElement('button')
    deleteBtn.className = 'flex items-center gap-2 text-[#ed6468] font-bold'
    let deleteIcon = `<svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>`
    deleteBtn.insertAdjacentHTML('beforeend', deleteIcon)
    deleteBtn.appendChild(document.createTextNode('Delete'))

    countainerBtn.appendChild(replayBtn)
    countainerBtn.appendChild(deleteBtn)
    
    User.appendChild(detailUser)
    User.appendChild(countainerBtn)

    
    let pContent = document.createElement('p')
    pContent.className = 'text-base text-[#67727e]'
    pContent.append(replay.content)

    detailComment.appendChild(User)
    detailComment.appendChild(pContent)

    mainComment.appendChild(voteComment)
    mainComment.appendChild(detailComment)
          
    commentDiv.appendChild(mainComment)
    repliesContainer.appendChild(commentDiv)
    
});