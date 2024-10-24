const postForm = document.getElementById('post-form');
const postContent = document.getElementById('post-content');
const postsContainer = document.getElementById('posts-container');
const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const postContainer = document.getElementById('post-container');
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let currentUser = null; // Store current user after login
loginForm.addEventListener('submit', (event)=>{
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple authentication check
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        currentUser = user;
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('post-container').style.display = 'block';
        alert(`Login successfully!Welcome, ${username}!`);
    } else {
        alert('Invalid username or password. Please try again.');
    }
});
postForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const postContent = document.getElementById('post-content').value;
    
    if (postContent) {
        // Create a new post element
        const postElement = document.createElement('div');
        postElement.textContent = `${currentUser.username}: ${postContent}`;
        postElement.className = 'post';
        
        // Append the new post to the posts container
        document.getElementById('posts-container').prepend(postElement);
        
        // Clear the textarea
        document.getElementById('post-content').value = '';
    }
});
// Function to display posts
function displayPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, postIndex) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <strong>Posted by: ${post.username}</strong>
            <p>${post.content}</p>
            <p><small>${post.date}</small></p>
            <p>👍 Likes: ${post.likes} | 👎 Dislikes: ${post.dislikes}</p>
            <button class="like" onclick="likePost(${postIndex})">👍 Like</button>
            <button class="dislike" onclick="dislikePost(${postIndex})">👎 Dislike</button>
            <input type="text" class="comment-input" id="comment-input-${postIndex}" placeholder="Add a comment">
            <button onclick="addComment(${postIndex})">💬 Comment</button>
            <div>
                <strong>Comments:</strong>
                <ul>
                    ${post.comments.map((comment, commentIndex) => `
                        <li>
                            ${comment.text} 
                            <br> 👍 ${comment.likes} 👎 ${comment.dislikes}
                            <button onclick="likeComment(${postIndex}, ${commentIndex})">👍 Like</button>
                            <button onclick="dislikeComment(${postIndex}, ${commentIndex})">👎 Dislike</button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Function to handle post submission
postForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const content = postContent.value;
    const newPost = {
        username: currentUser, // Add username to the post
        content: content,
        likes: 0,
        dislikes: 0,
        comments: [],
        date: new Date().toLocaleString() // Store current date and time
    };
    posts.push(newPost);
    postContent.value = '';
    savePosts(); // Save posts in localStorage
    displayPosts();
});

// Function to like a post
function likePost(index) {
    posts[index].likes++;
    savePosts();
    displayPosts();
}

// Function to dislike a post
function dislikePost(index) {
    posts[index].dislikes++;
    savePosts();
    displayPosts();
}

// Function to add a comment with likes and dislikes
function addComment(index) {
    const commentInput = document.getElementById(comment-input-${index});
    const comment = commentInput.value;
    if (comment) {
        const newComment = {
            text: comment,
            likes: 0,
            dislikes: 0
        };
        posts[index].comments.push(newComment);
        commentInput.value = '';
        savePosts();
        displayPosts();
    }
}

// Function to like a comment
function likeComment(postIndex, commentIndex) {
    posts[postIndex].comments[commentIndex].likes++;
    savePosts();
    displayPosts();
}

// Function to dislike a comment
function dislikeComment(postIndex, commentIndex) {
    posts[postIndex].comments[commentIndex].dislikes++;
    savePosts();
    displayPosts();
}

// Save posts to localStorage
function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Initial display of posts
displayPosts();