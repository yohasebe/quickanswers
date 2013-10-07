$(function(){

  // Fill in place holders in HTML
  $("html").attr("lang", $.quickanswers.messages.txt_lang);
  
  $(".txt_new_thread").html($.quickanswers.messages.txt_new_thread);
  $(".txt_edit").html($.quickanswers.messages.txt_edit);
  $(".txt_delete").html($.quickanswers.messages.txt_delete);
  $(".txt_reply").html($.quickanswers.messages.txt_reply);
  $(".txt_title").html($.quickanswers.messages.txt_title);
  $(".txt_body").html($.quickanswers.messages.txt_body);
  $(".txt_author").html($.quickanswers.messages.txt_author);
  $(".txt_mail").html($.quickanswers.messages.txt_mail);
  $(".txt_edit_pass").html($.quickanswers.messages.txt_edit_pass);  
  $(".txt_cancel").html($.quickanswers.messages.txt_cancel);
  $(".txt_submit").html($.quickanswers.messages.txt_submit);
  $(".txt_execute").html($.quickanswers.messages.txt_execute);
  $(".txt_instruction").html($.quickanswers.messages.txt_instruction);
  
  $(".txt_terms_of_use").append($.quickanswers.messages.txt_terms_of_use);
  $(".txt_no_threads_yet").append($.quickanswers.messages.txt_no_threads_yet);
  $(".txt_list_threads").append($.quickanswers.messages.txt_list_threads);
  $(".txt_unreplied").append($.quickanswers.messages.txt_unreplied);
  $(".txt_replied").append($.quickanswers.messages.txt_replied);
  $(".txt_sort_instruction").append($.quickanswers.messages.txt_sort_instruction);
  
  $(".txt_question_topic").prepend("<button class='button btn-link' style='font-weight:bold;'>" +
    $.quickanswers.messages.txt_question_topic + "</button>");
  $(".txt_topic_started").prepend("<button class='button btn-link' style='font-weight:bold;'>" +
    $.quickanswers.messages.txt_topic_started + "</button>");
  $(".txt_last_updated").prepend("<button class='button btn-link' style='font-weight:bold;'>" +
    $.quickanswers.messages.txt_last_updated + "</button>");
  $(".txt_num_replies").prepend("<button class='button btn-link' style='font-weight:bold;'>" +
    $.quickanswers.messages.txt_num_replies + "</button>");


  var inst = $.quickanswers.instructions;
  instruction_html = "<dl>\n";
  for(key in inst){
    instruction_html += ("<dt>" + key + "</dt>\n");
    instruction_html += ("<dd class='text-muted' style='margin-bottom:1em;'>" + inst[key] + "</dd>");
  }
  instruction_html += "</dl>\n";
  $(".txt_instruction").prepend(instruction_html);
  
  // When "Submit" button on a modal panel pressed
  // "entry" or "delete" action will be executed
  $('#submit_post, #submit_delete').click(function(e){
   
    var button = $(this);
    var form = $(this).parent().parent("form");

    if (!form.valid()) {
      return false;
    }

    $.ajax({
      url: form.attr('action'),
      type: form.attr('method'),
      data: form.serialize(),
      timeout: 10000,
      beforeSend: function(xhr, settings) {
        button.attr('disabled', true);
      },
      complete: function(xhr, textStatus) {
        button.attr('disabled', false);
      },
      success: function(result, textStatus, xhr) {
        console.log(result);
        if(result == "true"){
          $(".modal-footer").html($.quickanswers.messages.txt_success).addClass("alert alert-success").fadeIn("fast");
          setInterval(function(){
            location.reload();
          }, 1000);       
        } else {
          $(".modal-footer").html($.quickanswers.messages.txt_error).addClass("alert alert-danger").fadeIn("fast");
          setInterval(function(){
            location.reload();
          }, 1000);       
        }
      },
      error: function(xhr, textStatus, error) {
        $(".modal-footer").html($.quickanswers.messages.txt_error).addClass("alert alert-danger").fadeIn("fast");
        setInterval(function(){
          location.reload();
        }, 1000);       
      }
    });
  });
  
  function clear_modal_post(){
    $('#post_id_post').val("");
    $('#parent_id_post').val("");
    $('#title_post').val("");
    $('#body_post').val("");
    $('#author_post').val("");
    $('#mail_post').val("");
    $('#del_pass_post').val("");
    $('#parent_data_post').empty();
    validator_form_post.resetForm();  
  }

  function clear_modal_delete(){
    $('#post_id_delete').val("");
    $('#mail_delete').val("");
    $('#del_pass_delete').val("");
    $('#post_data_delete').empty();
    validator_form_delete.resetForm();  
  }

  // When "New Post" or "Edit Post" button is pressed
  // Modal panel shows up. It contains "Thread Title" 
  // except when the post is a reply to another post
  $('.new_post').click(function(){
    clear_modal_post();
    var this_id = $(this).attr('id');
    $('#modal_post').modal('show'); 
    $('#thread_title').show();
    $('#parent_id_post').val("0");
    $('#modal_header_post').children("span").html($.quickanswers.messages.txt_new_thread);
  }); 
  
  $('.edit_post').click(function(){
    var post_id = $(this).parent("p").prevAll(".post_html").attr('post_id');
    var thread_title = $(this).parent("p").prevAll(".post_html").attr('thread_title');
    var post_author = $(this).parent("p").prevAll(".post_html").attr('post_author');
    var post_body = $(this).parent("p").prevAll(".post_html").attr('post_body');
    var parent_id = $(this).parent("p").prevAll(".post_html").attr('parent_id');
    $('#modal_post').modal('show');
    if(parent_id == "0"){
      $('#thread_title').show();
    } else {
      $('#thread_title').hide();
    }
    $('#post_id_post').val(post_id);
    $('#title_post').val(thread_title);
    $('#author_post').val(post_author);
    $('#body_post').val(post_body.replace(/\n*\<br ?\/\>\n*/g, "\n"));
    $('#modal_header_post').children("span").html($.quickanswers.messages.txt_edit_post);
  });

  // When "reply" button is pressedｔ
  // Modal panel shows up.
  // But it does not contain "Thread Title" input
  $('.add_post').click(function(){
    clear_modal_post();
    var post_id = $(this).parent("p").prevAll(".post_html").attr('post_id');
    var post_author = $(this).parent("p").prevAll(".post_html").attr('post_author');
    var post_created_at = $(this).parent("p").prevAll(".post_html").attr('post_created_at');
    var post_body = $(this).parent("p").prevAll(".post_html").attr('post_body');
    $('#modal_post').modal('show');
    $('#parent_id_post').val(post_id);
    $('#thread_title').hide();
    var parent_text = "<blockquote>" + post_body + "<br /><b>" + post_author + "</b> (" + post_created_at + ")</blockquote>";
    $('#parent_data_post').append(parent_text);
    $('#modal_header_post').children("span").html($.quickanswers.messages.txt_new_reply);
  });

  // When "Delete" button is pressed
  // Modal panel shows up.
  $('.delete_post').click(function(){
    clear_modal_delete();
    var post_id = $(this).parent("p").prevAll(".post_html").attr('post_id');
    var post_author = $(this).parent("p").prevAll(".post_html").attr('post_author');
    var post_created_at = $(this).parent("p").prevAll(".post_html").attr('post_created_at');
    var post_body = $(this).parent("p").prevAll(".post_html").attr('post_body');
    $('#modal_delete').modal('show');
    $('#post_id_delete').val(post_id);
    $('#modal_header_delete').children("span").html($.quickanswers.messages.txt_del_post);
    var post_text = "<blockquote>" + post_body + "<br /><b>" + post_author + "</b> (" + post_created_at + ")</blockquote>";
    $('#post_data_delete').append(post_text);
  });
  
  // Top of the page link
  $('.to_top').click(function(){
    var top_position = $("#top").position();
    $(window).scrollTop(top_position.top);    
  });
});
