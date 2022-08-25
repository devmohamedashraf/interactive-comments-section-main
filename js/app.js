const addComment = document.querySelector('.addComment'),
addCommentTextarea = addComment.querySelector('.textarea-send'),
addCommentButton = addComment.querySelector('.btn-send')
const commentContainer= document.querySelector('.comment-container')
const formReply = document.querySelector('formReply')
// Empty Array To Store The comments
let comments = [];
let currentUser = {
    image: { 
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp"
      },
      username: "juliusomo"
}

// Check if Theres Tasks In Local Storage
if(localStorage.getItem('comments')){

    comments = JSON.parse(localStorage.getItem('comments'))
    addElementsToPageFrom(comments)
}else{
    axios.get('../data.json').then(response => {
        comments = response.data.comments;
        addDataToLocalStorageFrom(comments)
        addElementsToPageFrom(comments)
    })
}

addCommentButton.onclick = function () { 
    if(addCommentTextarea.value !== ''){
        addCommentToArry(comments)
        addCommentTextarea.value = ''
    }
}

function addCommentToArry(){
    if(addCommentTextarea.value !== ''){
        const comment = {
            id: Date.now(),
            content: addCommentTextarea.value,
            "createdAt": Date.now(),
            "score": 0,
            "voteStatus": false,
            "user": {
            "image": { 
                "png": currentUser.image.png,
                "webp": currentUser.image.webp
            },
            "username": currentUser.username
            },
            "replies": []
        }
        // Push Comment To Array Comments
        comments.push(comment)
        // Add Comments To Page
        addElementsToPageFrom(comments);
        // Add Comments To Local Storage
        addDataToLocalStorageFrom(comments);
    }
}

function addDataToLocalStorageFrom(comments){
    localStorage.setItem('comments', JSON.stringify(comments))
}

// Elements Component
function detailCommentComponent (user, idComment, contentComment, createdAtComment, idReply){
    
    let detailComment = document.createElement('div')
    detailComment.className = 'flex flex-col gap-4 flex-1'

    let User = document.createElement('div')
    User.className = 'flex justify-between'

    detailUser = document.createElement('div')
    detailUser.className = 'flex items-center gap-2'

    let userAvatar = document.createElement('img')
    userAvatar.src = user.image.png
    userAvatar.alt = user.username

    let userName = document.createElement('h2')
    userName.className = 'text-[#324152] font-bold'
    userName.append(user.username)

    let createdAt = document.createElement('span')
    createdAt.className = 'text-sm text-[#67727e]'
    createdAt.append(moment(createdAtComment).fromNow())


    detailUser.appendChild(userAvatar)
    detailUser.appendChild(userName)
    detailUser.appendChild(createdAt)

    User.appendChild(detailUser)
    User.appendChild(btnComponent(user.username, idComment, idReply, true))

    let pContent = document.createElement('p')
    pContent.className = 'text-base text-[#67727e]'
    pContent.append(contentComment)
    
    detailComment.appendChild(User)
    detailComment.appendChild(pContent)

    return detailComment
}

function voteComponent(score, hiddenVote, idComment, idReply){
    let voteComment = document.createElement('div')
    voteComment.className = `vote bg-[#c3c4ef47] ${hiddenVote ? 'md:flex hidden ' : 'flex'} md:flex-col flex-row gap-2 p-2 px-4 rounded-lg items-center`

    let voteInc = document.createElement('span')
    voteInc.className = 'text-[#c3c4ef] text-lg cursor-pointer hover:text-[#5457b6]'
    voteInc.append('+')

    let voteCount = document.createElement('span')
    voteCount.className = 'count text-[#5457b6] font-bold text-lg'
    voteCount.append(score)

    let voteDec = document.createElement('span')
    voteDec.className = 'text-[#c3c4ef] text-lg cursor-pointer hover:text-[#5457b6]'
    voteDec.append('-')

    if (idReply !== undefined) {
        voteInc.setAttribute('onclick', `voteCommentF(this, 'inc', '${idComment}', ${idReply})`)
        voteDec.setAttribute('onclick', `voteCommentF(this, 'dec', ${idComment}, ${idReply})`)
    }else{
        voteInc.setAttribute('onclick', `voteCommentF(this, 'inc', '${idComment}')`)
        voteDec.setAttribute('onclick', `voteCommentF(this, 'dec', ${idComment} )`)
    }


    voteComment.appendChild(voteInc)
    voteComment.appendChild(voteCount)
    voteComment.appendChild(voteDec)
    return voteComment
}

function btnComponent(userName, idComment, idReply, hiddenBtn){

    let countainerBtn = document.createElement('div')
    countainerBtn.className = `${hiddenBtn ? 'md:flex hidden' : 'flex'} gap-4 flex-row-reverse`

    let replyBtn = document.createElement('button')
    replyBtn.setAttribute('comment-id', idComment)

    replyBtn.className = 'replyComment flex items-center gap-2 text-[#5457b6] hover:text-[#c3c4ef] text-sm font-bold fill-[#5357B6] hover:fill-[#c3c4ef]'
    replyBtn.setAttribute('onclick', 'addReplyToComment(this)')
    let replyIcon = `<svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" /></svg>`
    replyBtn.insertAdjacentHTML('beforeend', replyIcon)
    replyBtn.appendChild(document.createTextNode('Reply'))

    let updateBtn = document.createElement('button')
    updateBtn.setAttribute('comment-id', idComment)
    updateBtn.className = 'updateReplyComment flex items-center gap-2 text-[#5357B6] text-sm font-bold'
    let updateIcon = `<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>`
    updateBtn.insertAdjacentHTML('beforeend', updateIcon)
    updateBtn.appendChild(document.createTextNode('Edit'))

    let deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('comment-id', idComment)
    deleteBtn.setAttribute('onclick', 'modalDelte(this)')
    deleteBtn.className = 'flex items-center gap-2 text-[#ed6468] text-sm font-bold'
    let deleteIcon = `<svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>`
    deleteBtn.insertAdjacentHTML('beforeend', deleteIcon)
    deleteBtn.appendChild(document.createTextNode('Delete'))
    
    if(idReply){
        replyBtn.setAttribute('reply-id', idReply)
        updateBtn.setAttribute('reply-id', idReply)
        updateBtn.setAttribute('onclick', 'updateReply(this)')
        deleteBtn.setAttribute('reply-id', idReply)
        deleteBtn.setAttribute('onclick', `modalDelte(this, 'reply', ${idComment}, ${idReply})`)

    }else{
        updateBtn.setAttribute('onclick', 'updateComment(this)')
        deleteBtn.setAttribute('onclick', `modalDelte(this, 'comment', ${idComment})`)

    }

    countainerBtn.appendChild(replyBtn)
    if(userName == currentUser.username){
        countainerBtn.appendChild(updateBtn)
        countainerBtn.appendChild(deleteBtn)
    }

    return countainerBtn
}

// Responsive btn and vote Component 
function responsiveComponent(score, userName, idComment, idReply){
    let responsive = document.createElement('div')
    responsive.className = 'md:hidden flex justify-between items-center w-full'

    let div = document.createElement('div')
    div.appendChild(btnComponent(userName, idComment, idReply))

    responsive.appendChild(voteComponent(score, false, idComment, idReply))
    responsive.appendChild(div)
    return responsive
}

function updateComponent(){
    let updateComment = document.createElement('div')
    updateComment.className = 'formUpdate rounded-lg px-6 py-4 bg-white hidden flex md:flex-nowrap justify-between flex-wrap gap-4 items-start mb-4 '

    let imgContainer = document.createElement('div')

    let img = document.createElement('img')
    img.src = currentUser.image.png
    img.className = 'w-[3rem]'
    imgContainer.appendChild(img)

    let textarea = document.createElement('textarea')
    textarea.className = 'textarea-reply md:flex-1 w-full md:order-none -order-1 border rounded-lg py-2 px-3 focus:outline-none focus:border'
    textarea.placeholder = 'Edit your reply'
    let btn = document.createElement('button')
    btn.className = 'btn-send bg-[#5457b6] text-white py-2 px-4 rounded-lg font-bold'
    btn.append('Update')

    updateComment.appendChild(imgContainer)
    updateComment.appendChild(textarea)
    updateComment.appendChild(btn)

    return updateComment
}

function replyComponent(){
    let replyComment = document.createElement('div')
    replyComment.className = 'formReply rounded-lg px-6 py-4 bg-white hidden flex md:flex-nowrap justify-between flex-wrap gap-4 items-start mb-4 '

    let imgContainer = document.createElement('div')

    let img = document.createElement('img')
    img.src = currentUser.image.png
    img.className = 'w-[3rem]'

    imgContainer.appendChild(img)

    let textarea = document.createElement('textarea')
    textarea.className = 'textarea-reply md:flex-1 w-full md:order-none -order-1 border rounded-lg py-2 px-3 focus:outline-none focus:border'
    textarea.placeholder = 'Add a reply'

    let btn = document.createElement('button')
    btn.className = 'btn-send bg-[#5457b6] text-white py-2 px-4 rounded-lg font-bold'
    btn.append('Reply')

    replyComment.appendChild(imgContainer)
    replyComment.appendChild(textarea)
    replyComment.appendChild(btn)
    return replyComment
}

function repliesComponent(comment){
    let replies = document.createElement('div')
    replies.className = 'replies flex relative mb-2'
    let replyLine = document.createElement('span')
    replyLine.className = 'line w-0.5 bg-[#eaecf1] md:mx-12 mx-2'
    let repliesContainer = document.createElement('div')
    repliesContainer.className = 'flex flex-col flex-1'

    if(comment.replies){
        comment.replies.forEach(reply => {

            let commentDiv = document.createElement('div')
            commentDiv.className = 'comment relative'

            commentDiv.setAttribute('reply-id', reply.id)
            commentDiv.setAttribute('comment-id', comment.id)

            let mainComment = document.createElement('div')
            mainComment.className = 'rounded-lg px-6 py-4 bg-white flex md:flex-row flex-col gap-8 items-start mb-4'

            mainComment.appendChild(voteComponent(reply.score, true, comment.id, reply.id))
            mainComment.appendChild(detailCommentComponent(reply.user, comment.id, reply.content, reply.createdAt, reply.id))
            mainComment.appendChild(responsiveComponent(reply.score, reply.user.username, comment.id, reply.id))

            commentDiv.appendChild(mainComment)
            commentDiv.appendChild(updateComponent())
            commentDiv.appendChild(replyComponent())

            repliesContainer.appendChild(commentDiv)
            replies.appendChild(replyLine)
            replies.appendChild(repliesContainer)
        });
    }
    return replies
}

function mainCommentComponent(comment) { 
    let commentDiv = document.createElement('div')
    commentDiv.className = 'comment relative'
    commentDiv.setAttribute('comment-id', comment.id)

    let mainComment = document.createElement('div')
    mainComment.className = 'rounded-lg px-6 py-4 bg-white flex md:flex-row flex-col gap-8 items-start mb-4'


    mainComment.appendChild(voteComponent(comment.score, true, comment.id))
    mainComment.appendChild(detailCommentComponent(comment.user, comment.id, comment.content, comment.createdAt))
    mainComment.appendChild(responsiveComponent(comment.score, comment.user.username, comment.id))

    commentDiv.appendChild(mainComment)
    commentDiv.appendChild(updateComponent())
    commentDiv.appendChild(replyComponent())

    commentDiv.appendChild(repliesComponent(comment))
    return commentDiv
}

function addElementsToPageFrom(comments){
    commentContainer.innerHTML = ''
    comments.forEach(comment => {
        commentContainer.appendChild(mainCommentComponent(comment))
    });
}

function addReplyToComment(e){
    let parentComment =  e.parentElement.parentElement.parentElement.parentElement.parentElement
    console.log(parentComment);
    parentComment.querySelector('.formReply').classList.toggle('hidden')
    parentComment.querySelector('.formReply button').onclick = function() {
        if(parentComment.querySelector('.formReply textarea').value !== ''){
            comments.map(comment => {
                const reply = {
                    id: Date.now(),
                    content: parentComment.querySelector('.formReply textarea').value,
                    "createdAt": Date.now(),
                    "score": 0,
                    "voteStatus": false,
                    "replyingTo": parentComment.querySelector('h2').innerHTML,
                    "user": {
                    "image": { 
                        "png": currentUser.image.png,
                        "webp": currentUser.image.webp
                    },
                    "username": currentUser.username
                    },
                }
                return comment.id == parentComment.getAttribute('comment-id') ? comment.replies.push(reply) : ''
            })
            // Add Comments To Page
            addElementsToPageFrom(comments);
            // Add Comments To Local Storage
            addDataToLocalStorageFrom(comments);
        }
    }

}

function updateReply(e){
    let parentComment =  e.parentElement.parentElement.parentElement.parentElement.parentElement
    parentComment.querySelector('.formUpdate').classList.toggle('hidden')
    parentComment.querySelector('.formUpdate button').onclick = function(){
        comments.map(comment => {
            return comment.replies.filter(reply => {
                reply.id == parentComment.getAttribute('reply-id') ? reply.content =  parentComment.querySelector('.formUpdate textarea').value : ''
                    return reply
            })
        })
        // Add Comments To Page
        addElementsToPageFrom(comments);
        // Add Comments To Local Storage
        addDataToLocalStorageFrom(comments);
    }
}

function updateComment(e){
    let parentComment =  e.parentElement.parentElement.parentElement.parentElement.parentElement
    parentComment.querySelector('.formUpdate').classList.toggle('hidden')
    parentComment.querySelector('.formUpdate button').onclick = function(){
        comments.map(comment => {
            comment.id == parentComment.getAttribute('comment-id') ? comment.content =  parentComment.querySelector('.formUpdate textarea').value : ''
            return comment
        })
        // Add Comments To Page
        addElementsToPageFrom(comments);
        // Add Comments To Local Storage
        addDataToLocalStorageFrom(comments);
    }
}

function modalDelte(e, type, idComment, idReply){
    console.log(e);
    console.log(type);
    let modal = `
  <div id="popup-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
  <div drawer-backdrop="" class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30"></div>
      <div class="fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 p-4 w-full max-w-md h-auto z-40">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button onclick='closeModal(this)' type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Close modal</span>
              </button>
              <div class="p-6 text-center">
                  <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this comment? This will remove the comment and cant be undone</h3>
                  <button onclick="closeModal(this, 'noCancel')" data-modal-toggle="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                  <button data-modal-toggle="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" 
                  onclick='deleteComment(this, ${idComment}, ${idReply})'>
                    Yes, I'm sure
                </button>
              </div>
          </div>
      </div>
  </div>`
  document.querySelector('body .comments').insertAdjacentHTML('beforeend', modal)
}
function deleteComment(e, idComment, idReply) {
    if(idReply){
        let replies = []
        let repliesF 
    
        repliesF = comments.map((comment) => {
            if(comment.id == idComment){
                return comment.replies.filter(reply => {
                    return reply.id == idReply ? '' : replies.push(reply) 
                })
            }
        })
    
        comments = comments.map((comment) => {
            comment.id == idComment ? comment.replies = replies : comment.replies
            return comment
        })

    }else{
        comments = comments.filter(comment => {
            return comment.id != idComment
        })
    }

        
    let deleteComponent = e.parentElement.parentElement.parentElement;
    deleteComponent.parentElement.remove()


    // Add Comments To Page
    addElementsToPageFrom(comments);
    // Add Comments To Local Storage
    addDataToLocalStorageFrom(comments);

}

function deleteReply(idComment, idReply) { 

}


function voteCommentF(e, action, idComment, idReply){

    if(idReply){
        comments = comments.filter(comment => {
            return comment.replies.filter(reply => {
                if(reply.voteStatus === false){
                    if(reply.id == idReply){
                        if(action == 'inc'){
                            reply.score += 1
                            reply.voteStatus = true
                        }else{
                            reply.score -= 1
                            reply.voteStatus = true
                        }
                    }
                }
                return reply
            })
        })
    }else{
        comments = comments.filter(comment => {
            if(comment.voteStatus === false){
                if(comment.id == idComment){
                    if(action == 'inc'){
                        comment.score += 1 
                        comment.voteStatus = true
                    }else{
                        comment.score -= 1
                        comment.voteStatus = true
                    }
                }
            }
            console.log(comment.voteStatus);
            return comment
        })
    }
    
    console.log(comments);
    // Add Comments To Page
    addElementsToPageFrom(comments);
    // Add Comments To Local Storage
    addDataToLocalStorageFrom(comments);

}

function closeModal(e, noCancel) { 
    let deleteComponent = e.parentElement.parentElement.parentElement;
    if(noCancel){
        deleteComponent.parentElement.remove()
    }else{
        deleteComponent.remove()
    }
}