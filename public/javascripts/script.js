$(document).ready(()=>{
	$('.delete-booking').on('click',(e)=>{
		$value = $(e.target);
		const id = $value.attr('data-id');
		$.ajax({
			type:'DELETE',
			url:'/wedding/'+id,
			success:(response)=>{
		        console.log('Deleting Booking');
		        window.location.href='/';
		      },
		      error:(err)=>{
		        console.log(err);
		      }
		});
	});
});
