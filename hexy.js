"use strict";

// # hexy.js -- utility to create hex dumps 
// 
// `hexy` is an easy to use javascript library to create hex dumps. It
// works just as well in node as in your browser. It contains a
// number of options to configure how the hex dump will end up looking.
// 
// It creates a pleasant looking hex dump by default:
//     
//```javascript     
//var hexy = require('hexy'),
//    b = Buffer.from("\000\001\003\005\037\012\011bcdefghijklmnopqrstuvwxyz0123456789")
//        // or String or Array containing numbers ( bytes, i.e. < 0xFF )
//
//console.log(hexy.hexy(b))
// ```
//
// results in this dump:
// 
//     00000000: 0001 0305 1f0a 0962 6364 6566 6768 696a  .......bcdefghij
//     00000010: 6b6c 6d6e 6f70 7172 7374 7576 7778 797a  klmnopqrstuvwxyz
//     00000020: 3031 3233 3435 3637 3839                 0123456789
// 
// but you can configure:
// 
//   * Line numbering
//   * Line width
//   * Format of byte grouping
//   * The case (upper/lower) of hex decimals
//   * Presence of the ASCII annotation in the right column.
// 
// This means it's easy to generate exciting dumps like:
// 
//     0000000: 0001 0305 1f0a 0962  .... ...b 
//     0000008: 6364 6566 6768 696a  cdef ghij 
//     0000010: 6b6c 6d6e 6f70 7172  klmn opqr 
//     0000018: 7374 7576 7778 797a  stuv wxyz 
//     0000020: 3031 3233 3435 3637  0123 4567 
//     0000028: 3839                 89
// 
// or even:
// 
//     0000000: 00 01 03 05 1f 0a 09 62   63 64 65 66 67 68 69 6a 
//     0000010: 6b 6c 6d 6e 6f 70 71 72   73 74 75 76 77 78 79 7a 
//     0000020: 30 31 32 33 34 35 36 37   38 39
// 
// with hexy!
// 
// ## Accepted Input
// 
// Currently, input should be one of the following:
// 
//   - a `Buffer`
//   - a `String`
//   - an `Array` containing `Number`s. These should fit into
//     8 bits, i.e. be smaller than 255. Larger values are truncated
//     (specifically `val & 0xff`)
// 
// ## Formatting Options
// 
// Formatting options are configured by passing a `format` object to the `hexy` function:
// 
//```javascript
//var format = {}
//    format.width = width // how many bytes per line, default 16
//    format.numbering = n // ["hex_bytes" | "none"],  default "hex_bytes"
//    format.base = b      // [2, 8, 10, 16], the base (radix) for numeral representation
//                         // for the right column,    default 16
//    format.format = f    // ["twos"|"fours"|"eights"|"sixteens"|"none"], number of nibbles per group
//                         //                          default "fours"
//    format.littleEndian = true
//                         // endiannes of data,       default false
//                         // counts when number of nibbles is more than "twos",
//                         // i.e. displaying groups bigger than one byte
//    format.extendedChs = true
//                         // allow displaying more characters in the text column
//                         //                          default false
//    format.caps = c      // ["lower"|"upper"],       default lower
//    format.annotate = a  // ["ascii"|"none"], ascii annotation at end of line?
//                         //                          default "ascii"
//    format.prefix = p    // <string> something pretty to put in front of each line
//                         //                          default ""
//    format.indent = i    // <num> number of spaces to indent
//                         //                          default 0
//    format.html = true   // funky html divs 'n stuff! experimental.
//                         //                          default: false
//    format.offset = X    // generate hexdump based on X byte offset
//                         // into the provided source
//                         //                          default 0
//    format.length = Y    // process Y bytes of the provide source 
//                         // starting at `offset`. -1 for all
//                         //                          default -1
//    format.display_offset = Z
//                         // add Z to the address prepended to each line
//                         // (note, even if `offset` is provided, addressing
//                         // is started at 0)
//                         //                          default 0
//
//console.log(hexy.hexy(buffer, format))
//``` 
// In case you're really nerdy, you'll have noticed that the defaults correspond
// to how `xxd` formats its output.
//            
// 
// ## Installing
// 
// Either use `npm` (or whatever compatible npm thingie people are using
// these days) :
//   
//```shell   
//$ npm install hexy
//```
//
// This will install the lib which you'll be able to use like so:
//     
//```javascript     
//var hexy = require("hexy"),
//    buf  = // get Buffer from somewhere,
//    str  = hexy.hexy(buf)
// ```
//
// It will also install `hexy` into your path in case you're totally fed up
// with using `xxd`.
//         
//  
// If you don't like `npm`, grab the source from github:
// 
//     http://github.com/a2800276/hexy.js
// 
// ## Typescript
//
//```typescript
//import {hexy} from "hexy";
//const buff = ...
//console.log(hexy(buff));
//```
//
// ## Browser Support
// 
// Basically eveything should work fine in the browser as well, just
// include hexy.js in a script tag, and you'll get `hexy` and `Hexy` stuck
// to the global object (window).
// 
// Some caveats: "Works fine on my system™". Browser support is 'new' and
// not thoroughly tested (... eh, only on chrome [Version: whatever I'm
// currently running]). Under node, I can generally assume that binary data
// is passed in in a sane fashion using buffers, but plain old Javascript
// doesn't really have any datatypes that can handle bytes gracefully.
// Currently only Strings and arrays containing Number'ish values are
// supported, I'd like to add numeric and typed arrays more explicitly.
// 
// Let me know in case you run into any issues, I'd be happy to find out
// about them.
// 
// ## TODOS
// 
// The current version only pretty prints node.js Buffers, and JS Strings
// and Arrays. This should be expanded to also do typed arrays,
// Streams/series of Buffers which would be nice so you don't have to
// collect the whole things you want to pretty print in memory, and such.
// 
// I'd like to improve html rendering, e.g. to be able to mouse over the
// ascii annotation and highlight the hex byte and vice versa, improve
// browser integration and set up a proper build & packaging system.
//
// Deno support would also be nice.
// 
// Better testing for browser use.
// 
//  
// ## Thanks
// 
// * Thanks to Isaac Schlueter [isaacs] for gratiously lending a hand and
// cheering me up.
// * dodo (http://coderwall.com/dodo)
// * the fine folks at [Travis](http://travis-ci.org/a2800276/hexy.js)
// * radare (https://github.com/radare)
// * Michele Caini (https://github.com/skypjack)
// * Koen Houtman (https://github.com/automagisch)
// * Stef Levesque (https://github.com/stef-levesque)
// * Abdulaziz Ghuloum (https://github.com/azizghuloum)
// 
// ## History
// 
// This is a fairly straightforward port of `hexy.rb` which does more or less the
// same thing. You can find it here: 
//  
//     http://github.com/a2800276/hexy
//  
// in case these sorts of things interest you.
//
// ### 0.3.3
// 
// * introduced the concept of endiannes (googleable and wikiable).  Before this change, the code assumed that the displayed data is big-endian.
//     However, most file formats and most CPU architectures are little-endian.  So, introduced the support for it.
//     The endiannes can be controlled by passing bool via `littleEndian`, which defaults to `false` to support the behavior of the previous versions
// * introduced ability to group 8 bytes (16 nibbles).  With prevalence of 64-bit computing, the 64-bit (i.e. 8-byte) data is getting more and more popular.
//     The 8-byte grouping is enabled by passing "sixteens" into `config.format`
// * introduced ability to display the binary data in bases other than hexadecimal: binary, octal, decimal and hexadecimal
//     The base is controlled by passing 2, 8, 10 or 16 into `config.base`
// * introduced ability to control if non-printable characters are displayed or replaced with '.'.
//     To display extended characters, pass `config.extendedChs: true`. The exact behavior of this flag depends on the output type, html or not:
//     In `config.html: true` mode, all the characters can be displayed, even 0-0x20 have visual represenation.
//     In `config.html: false` mode, only the extended characters beyond the end of standard ASCII are displayed.
// * implemented and exported `maxnumberlen()` -- calculates how many characters can a number occupy
// * nit: removed some of unused variables
// * formating consistency: slightly reformatted code around my changes
// * general readability: flipped some `switch()` statements around to handle most common cases on top
// * a bit more order in the test
//
// ### 0.3.2
// 
// * documentation typos
// * 2FA for npm publish
// 
// ### 0.3.1
// 
// * use strict
// * fixes undefined var. Thanks m-kircher!
//
// ### 0.3.0
//
// * adds typescript support. Thanks Abdulaziz!
// * remove support for old node versions (0.6-0.12)
// 
// ## Mail
// 
// In case you discover bugs, spelling errors, offer suggestions for
// improvements or would like to help out with the project, you can contact
// me directly (tim@kuriositaet.de). 

(function (arg) {

var hexy = function (buffer, config) {
  var h = new Hexy(buffer, config)
  return h.toString()
}

var Hexy = function (buffer, config) {
  var self = this
  const MAX_ADDRESS_LENGTH = 8 // TODO: might want to calculate
 	
  // if we have a Buffer class, convert
  if (typeof Buffer !== 'undefined') {
    buffer = (Buffer.isBuffer(buffer) && buffer) 
      || (typeof buffer === 'string' && Buffer.from(buffer)) 
      || (buffer && (buffer.constructor === Array) && Buffer.from(buffer)) // accept num arrays
      || Buffer.alloc(0)
  }
  buffer = buffer || []
  config = config || {}
 
  self.buffer    = buffer // magic string conversion here?
  self.bytes_per_line = parseInt(config.width) || 16 // formerly `width`
  self.numbering = config.numbering == "none"  ? "none" : "hex_bytes"
   
  switch (config.format) {
    case "none":
      self.bytes_per_group = 0 // one byte per group, but no delimiters
      break
    case "twos":
      self.bytes_per_group = 1
      break
    default: // "fours" roll in here
      self.bytes_per_group = 2
      break
    case "eights":
      self.bytes_per_group = 4
      break
    case "sixteens":
      self.bytes_per_group = 8
      break
  }
                                                                                                   
  self.littleEndian= config.littleEndian|| false
  self.base        = config.base        || 16
  self.collapse    = config.collapse
  self.caps        = config.caps        == "upper" ? "upper" : "lower"
  self.annotate    = config.annotate    == "none"  ? "none"  : "ascii"
  self.prefix      = config.prefix      || ""
  self.indent      = config.indent      || 0
  self.html        = config.html        || false
  self.offset      = config.offset      || 0
  self.length      = config.length      || -1
  self.extendedChs = config.extendedChs || false
  
  self.display_offset = config.display_offset || 0

  if (self.offset) {
    if (self.offset < self.buffer.length) {
      self.buffer = self.buffer.slice(self.offset)
    }
  }

  if (self.length !== -1) {
    if (self.length <= self.buffer.length) {
      self.buffer = self.buffer.slice(0,self.length)
    }
  }

  self.prefix = (self.html ? "&nbsp;" : " ").repeat(self.indent) + self.prefix

  self.hex_line_length = (maxnumberlen(self.bytes_per_group, self.base)) * self.bytes_per_line / Math.max(self.bytes_per_group, 1)
  switch (self.bytes_per_group) { // the original code (now documented in the tests),
      case 8:                     // some modes had mode-dependent number of extra spaces at the end of the line
      case 4:
      case 2:
        self.hex_line_length += Math.floor(self.bytes_per_line / self.bytes_per_group)
        break
      case 1:
        self.hex_line_length += self.bytes_per_line + 3
        break
      case 0:
        self.hex_line_length += 2
        break
  }
  self.bytes_per_group = Math.min(self.bytes_per_group, self.bytes_per_line)

  this.toString = function () {
    var str = ""

    if (self.html) { str += "<div class='hexy'>\n" }

    // render representation of individual lines:
    var line_arr = lines()

    // merge the lines into single string:
    for (var i = 0; i != line_arr.length; ++i) {
      var hex_raw = line_arr[i],
          hex = hex_raw[0],
          raw = hex_raw[1]

      var addr = i * self.bytes_per_line + self.offset + self.display_offset
      if (self.html) {
        var odd = i%2 == 0 ? " even" : "  odd"
        str += "<div class='" + num2str(addr, MAX_ADDRESS_LENGTH, 16) + odd + "'>"
      }
      str += self.prefix 

      // the address column:
      if (self.numbering === "hex_bytes") {
        str += num2str(addr, MAX_ADDRESS_LENGTH, 16)
        str += ": "
      }

      // the binary representation column:
      str += rpad(hex, self.hex_line_length)

      // the text representation column:
      if (self.annotate === "ascii") {
        str += " "
        str += (self.html ? html_escape(raw) : ascii_escape(raw))
      }
      str += self.html ? "</div>\n" : "\n"
    }
    if (self.html) { str += "</div>\n" }
    return str
  }

  // renders individual lines and returns an array of [hex, ascii] elements -- one per line
  var lines = function() {
    var result = []
    for (var i = 0; i < self.buffer.length; i += self.bytes_per_line) {
      var begin = i
      var end   = Math.min(i + self.bytes_per_line, self.buffer.length)
      var slice = self.buffer.slice(begin, end)
      var left  = hex(slice, self.bytes_per_line, self.bytes_per_group, self.base, self.littleEndian)
      var right = slice.toString('binary')
      if (self.caps === "upper") {
        left = left.toUpperCase()
      }
      if (self.buffer.constructor == Array) {
        right = String.fromCharCode.apply(self, slice)
      }
      result.push([left, right]) // romanp: TODO: see if this can be injected directly into a string
    }
    return result
  }

  // renders the binary representation of individual line
  var hex = function(buffer, bytes_per_line, bytes_per_group, base, littleEndian) {
    var str = ""
    const delimiter = bytes_per_group == 0 ? "" : " "
    const group_len = maxnumberlen(bytes_per_group, base)
    const padlen = (bytes_per_line - buffer.length) * (bytes_per_group == 0 ? group_len: (group_len + 1) / bytes_per_group)
    if (bytes_per_group == 0) {
      bytes_per_group = 1
    }
    const start = littleEndian ? bytes_per_group - 1 : 0
    const end = littleEndian ? -1 : bytes_per_group
    const step = littleEndian ? -1 : 1
    for (var group = 0; group < buffer.length / bytes_per_group; ++group) {
      var val = BigInt(0)
      for (var ii = start; ii != end; ii += step) {
        const i = group * bytes_per_group + ii
        if (i >= buffer.length) { // not rendering dangling bytes.  TODO: render them as smaller grouping
          break
        }
        val = val * 256n + BigInt(buffer.constructor == String ? buffer.codePointAt(i) : buffer[i])
      }
      const text = val.toString(base)
      for (var c = 0; c < group_len - text.length; c++) {
        str += "0"
      }
      str += text
      str += delimiter
    }
    if (buffer.length < bytes_per_line) {
      str += (self.html ? "&nbsp;": " ").repeat(padlen)
    }
    return str
  }

  // converts a number to a string and pads it with '0' on the right up to requested length
  var num2str = function(b, len, base) {
    var s = b.toString(base)
    while (s.length < len) {
      s = "0" + s
    }
    return s
  }

  var rpad = function(s, len) {
    const to_add = len - s.length - 1

    if (to_add > 0) {
      s += (self.html ? "&nbsp;" : " ").repeat(to_add)
    }
    return s
  }

  var ascii_escape = function(str) {
    return str.replace(self.extendedChs ? /[\u0000-\u001f]/g: /[^\u0020-\u007f]/g, ".")
  }

  var html_escape = function(str) {
    str = str.split("&").join("&amp;")
    str = str.split("<").join("&lt;")
    str = str.split(">").join("&gt;")
    if (self.extendedChs) {
      str = str.replace(/\'/g, "&apos;")
      str = str.replace(/\"/g, "&quot;")
      str = str.replace(/[^\u0020-\u007f]/g, function(ch) {
        ch = ch.codePointAt(0)
        return "&#x" + ch.toString(16) + ";"
      })
    } else {
      str = str.replace(/[^\u0020-\u007f]/g, ".")
    }
    return str
  }
}

Hexy.VERSION = "0.3.3"

var maxnumberlen = function(bytes, base) {
  var result = 2
  if (bytes == 0) {
    bytes = 1
  }
  switch (base) {
    case 2:       // BIN: 8, 16, 32, 64
      result = bytes * 8
      break
    case 8:       // OCT: 3, 6, 11, 22
      switch (bytes) {
        case 1:
          result = 3
          break
        case 2:
          result = 6
          break
        case 4:
          result = 11
          break
        case 8:
          result = 22
          break
      }
      break
    case 10:      // DEC: 3, 6, 10, 20
      switch (bytes) {
        case 1:
          result = 3
          break
        case 2:
          result = 6
          break
        case 4:
          result = 10
          break
        case 8:
          result = 20
          break
      }
      break
    case 16:      // HEX: 2, 4, 8, 16
      result = 2 * bytes
      break
  }
  return result
}


// This is probably not the prettiest or coolest way to to determine runtime
// environment. It seems to work and I'm not up to the task figuring out what
// the module system du jour is and how to interface with it ...

// If anyone wants to fix this to include this module "properly", I'm more than
// happy to incorporate any fixes...

var _exp
if (typeof exports !== "undefined") {
  _exp = exports
} else if (arg === window) {
  _exp = window
} else {
  // who knows?
  _exp = arg // or this or somethings. ...
}
_exp.hexy = hexy
_exp.Hexy = Hexy
_exp.maxnumberlen = maxnumberlen

})(this)
