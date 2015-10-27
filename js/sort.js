function ascBubbleSort(unSortedArr){
	var len = unSortedArr.length;
	var tem;
	for(var i = 1;i < len;i++){
		for(var j = 0;j < len-i;j++){
			if(unSortedArr[j] > unSortedArr[j + 1]){
				tem = unSortedArr[j];
				unSortedArr[j] = unSortedArr[j + 1];
				unSortedArr[j + 1] = tem;
			}
		}
	}
}

function ascQuickSort(unSortedArr){
	var refValue = unSortedArr[0];
	var len = unSortedArr.length;
	var rtl = len - 1,ltr = 1,tem;
	if(len == 2){
		if(unSortedArr[1] < unSortedArr[0]){
			tem = unSortedArr[0];
			unSortedArr[0] = unSortedArr[1];
			unSortedArr[1] = tem;
		}
	}
	else{
		while(rtl > ltr){
			for(;rtl > 0;rtl--){
				if(unSortedArr[rtl] < refValue){
					break;
				}
			}
			for(;ltr < len;ltr++){
				if(unSortedArr[ltr] < refValue && ltr < rtl){
					continue;
				}else if(unSortedArr[ltr] > refValue && ltr < rtl){
					tem = unSortedArr[rtl];
					unSortedArr[rtl] = unSortedArr[ltr];
					unSortedArr[ltr] = tem;
					break;
				}else{
					tem = unSortedArr[0];
					unSortedArr[0] = unSortedArr[rtl];
					unSortedArr[rtl] = tem;
					break;
				}
			}
		}
	}
}


/* 这是一个产生无重复数的数组的函数
 * 去重的过程是：
 * 随机产生了一个数之后，用indexOf函数去找这个数
 * 如果没找到（返回－1）就push这个数到数组中
 * 否则就重新随机产生一个数，并重复上面的过程
 * 这个函数产生3w长度的数组耗时约1秒，4w长度耗时约2秒
 * 10w长度的时候耗时未知，因为太久了
*/
function generateUnsortedNoRepeatArray(count,range){
	if(count > range){
		console.log('错误！');
		return null;
	}
	var arr = [];
	var ran;
	for(var i = 0;i < count;i++){
		ran = Math.random() * range;
		ran = Number(ran.toFixed());
		if(arr.indexOf(ran) === -1){
			arr.push(ran);
			continue;
		}else{
			while(arr.indexOf(ran) !== -1){
				ran = Math.random() * range;
				ran = Number(ran.toFixed());
			}
			arr.push(ran);
		}
	}
	return arr;
}


function generateUnsortedNoRepeatArray2(count,range){
	if(count > range){
		console.log('错误！');
		return null;
	}

	var mainArr = new Array(range+1);
	var resultArr = [],ran = 0;
	mainArr.forEach(function(val,index,arr){
		val = 0;
	});
	for(var i = 0;i < count;i++){
		ran = Number((Math.random() * range).toFixed());
		while(ran > mainArr.length || mainArr[ran] > 0 || ran === 0){
			ran = Number((Math.random() * range).toFixed());
		}
		mainArr[ran] = 1;
		resultArr.push(ran);
	}
	return resultArr;
}



function generateUnsortedRepeatArray(count,range){
	var arr = [];
	var ran;
	for(var i = 0;i < count;i++){
		ran = Math.random() * range;
		ran = ran.toFixed();
		arr.push(ran);
	}
	return arr;
}


/*
一本书的页码从自然数1开始编码直到自然数n，按照通常的习惯，每个页码都不包含多余的前导数字0，
例如第6页用数字6而不是06或者006表示。现在给定表示书的总页码的十进制整数n(1 =< n <= 10^9)，
编程计算书的全部页码中分别用到多少次数字0, 1, 2, 3, 4, 5, 6, 7, 8, 9。
*/
function calcTotalNumUsed(num){
	var resultArr = [0,0,0,0,0,0,0,0,0,0],temArr = [];
	for(var i = 1;i <= num;i++){
		temArr = (i + '').split('');
		for(var j = 0;j < temArr.length;j++){
			resultArr[Number(temArr[j])]++;
		}
	}
	return resultArr;
}

var arr2 = [6,1,2,7,9,3,4,5,10,8];
//ascQuickSort(arr2);

var arr1 = [8,100,50,22,15,6,1,1000,999,0];
ascBubbleSort(arr1);