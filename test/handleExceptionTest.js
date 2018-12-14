const {deepEqual} = require('assert');
const {
  handleHeadError,
  handleTailError,
  displayFileNotFoundError,
  isSingleFile,
  isValidOption,
} = require('../src/handleException.js');

describe('Test for handleHeadError', function() {
  it('should return empty if all arguments are valid ', function() {
    let fs = {
      existsSync: function(file) {
        return true;
      },
    };
    deepEqual(handleHeadError(2, 'n', ['file1', 'file2'], fs), '');
    deepEqual(handleHeadError(2, 'c', ['file'], fs), '');
  });

  it('should return illegal option message for illegal option ', function() {
    let fs = {
      existsSync: function(file) {
        return true;
      },
    };
    let illegalOption = 'head: illegal option -- ';
    let usage = 'usage: head [-n lines | -c bytes] [file ...]';
    deepEqual(
      handleHeadError(2, '-p', ['file1', 'file2'], fs),
      illegalOption + '-p\n' + usage,
    );
  });

  it("should return illegal byte count message for illegal count and option 'c' ", function() {
    let fs = {
      existsSync: function(file) {
        return true;
      },
    };
    let illegalCountMsg = 'head: illegal byte count -- ';
    deepEqual(
      handleHeadError(-2, 'c', ['file1', 'file2'], fs),
      illegalCountMsg + '-2',
    );
  });

  it("should return illegal line count message for illegal count and option 'n' ", function() {
    let fs = {
      existsSync: function(file) {
        return true;
      },
    };
    let illegalCountMsg = 'head: illegal line count -- ';
    deepEqual(
      handleHeadError(-2, 'n', ['file1', 'file2'], fs),
      illegalCountMsg + '-2',
    );
  });

  it('should return error msg if the file not exist ', function() {
    let fs = {
      existsSync: function(file) {
        return false;
      },
    };
    let error = 'head: file1: No such file or directory';
    deepEqual(handleHeadError(2, 'n', ['file1'], fs), error);
  });
});

describe('Test for handleTailError', function() {
  it('should return empty if all arguments are valid ', function() {
    let fs = {
      existsSync: function(file) {
        return true;
      },
    };
    deepEqual(handleTailError(2, 'n', ['file1', 'file2'], fs), '');
    deepEqual(handleTailError(2, 'c', ['file'], fs), '');
  });

  it('should return illegal option message for illegal option ', function() {
    let fs = {
      existsSync: function(file) {
        return true;
      },
    };
    let illegalOption = 'tail: illegal option -- ';
    let usage =
      'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
    deepEqual(
      handleTailError(2, '-p', ['file1', 'file2'], fs),
      illegalOption + '-p\n' + usage,
    );
  });

  it('should return illegal offset message for illegal count ', function() {
    let fs = {
      existsSync: function(file) {
        return true;
      },
    };
    let illegalOffsetMsg = 'tail: illegal offset -- ';
    deepEqual(
      handleTailError('p', 'c', ['file1', 'file2'], fs),
      illegalOffsetMsg + 'p',
    );
  });

  it('should return nothing for legal count and negative numbers ', function() {
    let fs = {
      existsSync: function(file) {
        return true;
      },
    };
    let illegalOffsetMsg = 'tail: illegal offset -- ';
    deepEqual(handleTailError('2', 'c', ['file1', 'file2'], fs), '');
    deepEqual(handleTailError('-2', 'c', ['file1', 'file2'], fs), '');
    deepEqual(handleTailError('0', 'c', ['file1', 'file2'], fs), '');
  });

  it('should return error msg if the file not exist ', function() {
    let fs = {
      existsSync: function(file) {
        return false;
      },
    };
    let error = 'tail: file1: No such file or directory';
    deepEqual(handleTailError(2, 'n', ['file1'], fs), error);
  });
});

describe('Test for isSingleFile', function() {
  it('should return true  if the files array contain only one file', function() {
    deepEqual(isSingleFile([]), false);
    deepEqual(isSingleFile(['file']), true);
    deepEqual(isSingleFile(['file1', 'file2']), false);
  });
});

describe('Test for isValidOption', function() {
  it('should return true if option is valid', function() {
    deepEqual(isValidOption('c'), true);
    deepEqual(isValidOption('n'), true);
    deepEqual(isValidOption('2'), false);
    deepEqual(isValidOption('p'), false);
  });
});

describe('Test for displayFileNotFoundError', function() {
  it('should return an error message for head and tail if the file name is given', function() {
    fileName = 'numbers';
    deepEqual(
      displayFileNotFoundError('head', fileName),
      'head: ' + fileName + ': No such file or directory',
    );
    deepEqual(
      displayFileNotFoundError('tail', fileName),
      'tail: ' + fileName + ': No such file or directory',
    );
  });
});
