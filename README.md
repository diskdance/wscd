# Wikimedia Server Connectivity Dashboard
This is a web tool which helps you identify whether you can view and edit projects of Wikimedia from your network.

## Objective
This tool allows:
1. ...newcomers in censored states (e.g. China) to check whether they can edit through their VPN or proxy.
2. ...veteran users to identify new blocks of Wikimedia projects in censored network.


## Usage
* **Standard check**: Check projects which have high popularity (e.g. English Wikipedia) or are known to be blocked (e.g. Chinese Wikipedia)
* **Extended check**: Check all WMF projects

## Caveats
1. This tool is not aware of blocks by [TorBlock](https://www.mediawiki.org/wiki/Extension:TorBlock) extension due to API limitations.
2. This tool checks blocks regardless of the rights of the logged-in accounts.

## Todo
- [ ] RTL support (PRs are welcomed)
- [ ] Performance issue of large tables

## License
The tool is licensed under the MIT License. See `LICENSE` for more info.
