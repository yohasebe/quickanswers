(function ($) {
  $.extend($.validator.messages, {
    required: "This field is required.",
    remote: "Please fix this field.",
    email: "Please enter a valid email address.",
    url: "Please enter a valid URL.",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    equalTo: "Please enter the same value again.",
    maxlength: $.validator.format("Please enter no more than {0} characters."),
    minlength: $.validator.format("Please enter at least {0} characters."),
    rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
  });
  
  $.quickanswers = {
    messages: {
      txt_edit_post: "Edit your post",
      txt_new_thread: "Post a new question",
      txt_new_reply: "Post a new reply",
      txt_author: "Your name",
      txt_mail: "Your email address",
      txt_edit_pass: "Password for editing",
      txt_del_post: "Delete your post",
      txt_title: "Post title",
      txt_body: "Body",
      txt_cancel: "Cancel",
      txt_submit: "Submit",
      txt_execute: "Execute",
      txt_edit: "Edit",
      txt_delete: "Delete",
      txt_reply: "Reply",
      txt_success: "Success!",
      txt_error: "Error!",
      txt_list_threads: "List of Questions",
      txt_question_topic: "Question",
      txt_topic_started: "Question submitted",
      txt_last_updated: "Last updated",
      txt_num_replies: "Replies",
      txt_replied: "Replied",
      txt_unreplied: "Unreplied",
      txt_terms_of_use: "Usage",
      txt_no_threads_yet: "No question has been submitted yet.",
      txt_sort_instruction: "The list is sortable by clicking column headers."
    },
    instructions: {
      "Submit a question or reply": "Click the \"Post a new question\" or \"Reply\" button and fill out the form that opens. E-mail address and a password are not shown to the public but necessary for later modification or removal of the post.",
      "Edit/Delete a question or reply": "Click the \"Edit\" or \"Delete\" button. It requires the same set of E-mail address and password that you used when you created the post.",
      "When you delete your post ...": "If you ever do it, all the replies made to the post will be deleted too. Please be careful!",
      "Access to Q &amp; A": "\"List of Questions\" allows you to browse all the topics and jump to any of the Q &amp; A's."
    }
  };

}(jQuery));
